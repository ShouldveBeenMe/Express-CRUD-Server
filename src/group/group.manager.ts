/* eslint-disable no-prototype-builtins */
/* eslint-disable no-return-await */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import mongoose, { Schema, Document } from 'mongoose';
import { DuplicateFieldError, DataBaseError } from '../errors';
import { GroupRepo } from './group.repository';
import { Group } from './group.interface';
import { checkIfDuplicateExists } from '../funcUtils';
import { PersonManager } from '../person/person.manager';

type objID = Schema.Types.ObjectId;

export class GroupManager {
    static async createGroup(newGroup: Group) {
        try {
            // console.log('achieved');
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
        if (!this.getGroup({ id: GroupID })) {
            throw Error('Group isnt exist');
        }
        // if ('subGroups' in filter) {
        //     const grpArr = filter.subGroups;
        //     if (this.isValidSubGroupsArray(grpArr)) {
        //         return await GroupRepo.updateGroup(GroupID, filter);
        //     }
        //     throw Error('Group exists twice or more');
        // }
        // if (filter.hasOwnProperty('persons')) {
        //     const perArr = filter.persons;
        //     if (this.isValidPersonsArray(perArr)) {
        //         return await GroupRepo.updateGroup(GroupID, filter);
        //     }
        //     return 'Person exists twice or more';
        // }

        return await GroupRepo.updateGroup(GroupID, filter);
    }

    // static isValidPersonsArray(persArray: objID[]) {
    //     return checkIfDuplicateExists(persArray);
    // }

    // static isValidSubGroupsArray(subGroupArray: objID[]) {
    //     return checkIfDuplicateExists(subGroupArray);
    // }

    static isSubGroupParentGroup(GroupID: string, subGrpArr: string[]): boolean {
        return subGrpArr.indexOf(GroupID) >= 0;
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
