/* eslint-disable no-prototype-builtins */
/* eslint-disable no-return-await */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import mongoose, { Schema, Document } from 'mongoose';
import { throws } from 'assert';
import { DuplicateFieldError, DataBaseError } from '../errors';
import { GroupRepo } from './group.repository';
import { Group } from './group.interface';
import { checkIfDuplicateExists } from '../funcUtils';
import { PersonManager } from '../person/person.manager';

export class GroupManager {
    static async createGroup(newGroup: Group) {
        try {
            // console.log('achieved');
            if (newGroup.subGroups) {
                if (this.isSubGroupParentGroup(newGroup.id, newGroup.subGroups)) {
                    throw Error("Group can't be it's own parent");
                }
                if (!this.areAllGroupsOrphans(newGroup.subGroups)) {
                    throw Error("Group can't have two parent Groups");
                }
            }

            return await GroupRepo.createGroup(newGroup);
        } catch (e) {
            if (e.code === 11000 && e.name === 'MongoError') {
                throw new DuplicateFieldError(`${e.keyValue.id} Already Exist`);
            }
        }
    }

    static async getGroup(filter: any) {
        try {
            const grpRes = await GroupRepo.getGroup(filter);
            console.log(grpRes[0].subGroups);
            return grpRes;
        } catch (e) {
            if (e.code === 11000 && e.name === 'MongoError') {
                throw new DataBaseError(`${e.keyValue.id} Already Exist`);
            }
        }
    }

    static async deleteGroup(GroupID: string) {
        // return await GroupRepo.deleteGroup(GroupID);
        this.recursiveGroupDelete(GroupID);
    }

    static async updateGroup(GroupID: string, filter: any) {
        if (!(await this.getGroup({ id: GroupID }))) {
            throw Error('Group isnt exist');
        }
        if (!(await this.isValidSubGroupsArray(filter.subGroups))) {
            throw Error("Can't have duplicate group");
        }
        if (!(await this.isSubGroupParentGroup(GroupID, filter.subGroups))) {
            throw Error("Group can't be Subgroup of itself");
        }
        if (!(await this.areAllGroupsOrphans(filter.subGroup))) {
            throw Error("A group can't be in two groups");
        }
        if (await this.isSubGroupAncestor(GroupID, filter.subGroups)) {
            throw Error("Group can't be ancestor of itself");
        }
        if (!(await this.isValidPersonsArray(filter.persons))) {
            throw Error("Group Can't have duplicate person");
        }

        return await GroupRepo.updateGroup(GroupID, filter);
    }

    static isSubGroupParentGroup(GroupID: string, subGrpArr: string[]): boolean {
        return subGrpArr.indexOf(GroupID) >= 0;
    }

    static isValidPersonsArray(persArr: string[]) {
        return checkIfDuplicateExists(persArr);
    }

    static isValidSubGroupsArray(subGrpsArr: string[]) {
        return checkIfDuplicateExists(subGrpsArr);
    }

    static async isSubGroupAncestor(searchID: string, subGrps: string[]) {
        const subGroupsArray = subGrps;
        if (subGroupsArray) {
            const subgroupsSearchPromises = subGroupsArray.map(grpID => {
                return GroupManager.searchForGroupID(searchID, grpID);
            });
            return await Promise.all(subgroupsSearchPromises).then(result => {
                const resArray = result;
                return resArray.includes(true);
            });
        }
        return false;
    }

    static async searchForGroupID(searchID: string, subGrpID: string): Promise<any> {
        return await GroupManager.getGroup({ id: subGrpID })
            .then(async subGroup => {
                if (!subGroup) {
                    throw Error('subGroup doesnt exist');
                }
                const subGroupsArray = subGroup[0].subGroups;
                if (subGroupsArray) {
                    const subgroupsSearchPromises = subGroupsArray.map(grpID => {
                        return this.searchForGroupID(searchID, grpID);
                    });
                    const res = await Promise.all(subgroupsSearchPromises).then(result => {
                        const resArray = result;
                        return resArray.includes(true);
                    });
                    return res;
                }
            })
            .then(result => {
                return subGrpID === searchID || result;
            });
    }

    static async areAllPeopleExist(persArray: string[]) {
        const areExist = persArray.map(persID => {
            return !!PersonManager.getPerson({ id: persID });
        });
        return !areExist.includes(false);
    }

    static async areAllGroupsExist(grpArray: string[]) {
        const areExist = grpArray.map(grpID => {
            return !!GroupManager.getGroup({ id: grpID });
        });
        return !areExist.includes(false);
    }

    static async areAllGroupsOrphans(grpArray: string[]) {
        const areOrphans = grpArray.map(async grpID => {
            const groupToCheck = await GroupManager.getGroup({ id: grpID });
            if (groupToCheck) {
                return !groupToCheck[0].parentGroupID;
            }
        });
        await Promise.all(areOrphans).then(result => {
            const resArray = result;
            return !resArray.includes(false);
        });
        return true;
    }

    static async recursiveGroupDelete(groupToDeleteID: string) {
        GroupManager.getGroup({ id: groupToDeleteID }).then(async groupToDelete => {
            if (!groupToDelete) {
                throw Error('Group to delete wasnt found');
            }
            const subGroupsArray = groupToDelete[0].subGroups;
            if (subGroupsArray) {
                const subgroupsDeletePromises = subGroupsArray.map(grpID => {
                    return this.recursiveGroupDelete(grpID);
                });
                await Promise.all(subgroupsDeletePromises);
            }
            return await GroupRepo.deleteGroup(groupToDeleteID);
        });
    }
}
