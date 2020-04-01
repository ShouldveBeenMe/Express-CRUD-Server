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

interface hierarchyType {
    groupDocs: Array<Document>;
    personsDocs: Array<Document>;
}

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

            const pCreatedGroup = await GroupRepo.createGroup(newGroup);
            const updatedPersons = newGroup.persons && (await this.updateGroupToPersons(newGroup.id, newGroup.persons));
            return pCreatedGroup;
        } catch (e) {
            if (e.code === 11000 && e.name === 'MongoError') {
                throw new DuplicateFieldError(`${e.keyValue.id} Already Exist`);
            }
        }
    }

    static async getGroup(filter: any) {
        try {
            const grpRes = await GroupRepo.getGroup(filter);
            // console.log(grpRes[0].subGroups);
            return grpRes;
        } catch (e) {
            if (e.code === 11000 && e.name === 'MongoError') {
                throw new DataBaseError(`${e.keyValue.id} Already Exist`);
            }
        }
    }

    static async deleteGroup(GroupID: string) {
        // return await GroupRepo.deleteGroup(GroupID);
        return await this.recursiveGroupDelete(GroupID);
    }

    static async updateGroup(GroupID: string, filter: any) {
        if (!(await this.getGroup({ id: GroupID }))) {
            throw Error('Group isnt exist');
        }
        if (filter.subGroups && !(await this.isValidSubGroupsArray(filter.subGroups))) {
            throw Error("Can't have duplicate group");
        }
        if (filter.subGroups && (await this.isSubGroupParentGroup(GroupID, filter.subGroups))) {
            throw Error("Group can't be Subgroup of itself");
        }
        if (filter.subGroups && !(await this.areAllGroupsOrphans(filter.subGroups))) {
            throw Error("A group can't be in two groups");
        }
        if (filter.subGroups && (await this.isSubGroupAncestor(GroupID, filter.subGroups))) {
            throw Error("Group can't be ancestor of itself");
        }
        if (filter.persons && !(await this.isValidPersonsArray(filter.persons))) {
            throw Error("Group Can't have duplicate person");
        }

        const pUpdatedGroup = await GroupRepo.updateGroup(GroupID, filter);
        const pUpdatedPersons =
            pUpdatedGroup?.persons && (await this.updateGroupToPersons(GroupID, pUpdatedGroup?.persons));
        const pUpdatedSubGroups =
            pUpdatedGroup?.subGroups && (await this.updateParentGroupToSubGroups(GroupID, pUpdatedGroup?.subGroups));
        return pUpdatedGroup;
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

    static async updateGroupToPersons(GroupID: string, persArray: string[]) {
        const personsPutPromises = persArray.map(persID => {
            return PersonManager.updatePerson(persID, { $addToSet: { groups: GroupID } });
        });
        await Promise.all(personsPutPromises);
    }

    static async updateParentGroupToSubGroups(GroupID: string, subGrpsArr: string[]) {
        const subGrpPutPromises = subGrpsArr.map(subGrpID => {
            return GroupManager.updateGroup(subGrpID, { parentGroupID: GroupID });
        });
        await Promise.all(subGrpPutPromises);
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

    static async getPersonFromGroup(personName: string, GrpID: string): Promise<any> {
        const foundGroup = await GroupManager.getGroup({ id: GrpID });
        if (!foundGroup) {
            throw Error('Group to search in wasnt found');
        }
        const personFound = await PersonManager.getPerson({ name: personName, groups: GrpID });
        return personFound;
    }

    static async getPersonGroups(personID: string): Promise<any> {
        const foundPerson = await PersonManager.getPerson({ id: personID });
        if (!foundPerson) {
            throw Error('Person wasnt found');
        }
        if (!foundPerson[0].groups) {
            return [];
        }
        return GroupRepo.getGroupsByIDs(foundPerson[0].groups, {});
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

    static async getMainGroupHierarchy(groupToShowObj: any) {
        const groupToShow = await GroupManager.getGroup({ id: groupToShowObj.id });
        if (!groupToShow) {
            throw Error('Group to show wasnt found');
        }
        let hierarchyToSend: hierarchyType = { personsDocs: [], groupDocs: [] };
        hierarchyToSend.groupDocs = hierarchyToSend.groupDocs.concat(groupToShow);
        hierarchyToSend = await this.getGroupHierarchy(groupToShowObj.id, hierarchyToSend);
        return hierarchyToSend;
    }

    static async getGroupHierarchy(groupToShowID: string, hierarchyObj: hierarchyType) {
        const groupToShow = await GroupManager.getGroup({ id: groupToShowID });
        if (!groupToShow) {
            throw Error('Group to show wasnt found');
        }
        const subGroupsArray = groupToShow[0].subGroups;

        if (subGroupsArray && subGroupsArray?.length > 0) {
            const subGroupsFound = await GroupRepo.getGroupsByIDs(subGroupsArray, {});
            const subgroupsShowPromises = subGroupsArray.map(async grpID => {
                const gotHierarchy = await this.getGroupHierarchy(grpID, hierarchyObj);
                await hierarchyObj.groupDocs.concat(gotHierarchy.groupDocs);
                await hierarchyObj.personsDocs.concat(gotHierarchy.personsDocs);
                return gotHierarchy;
            });
            await Promise.all(subgroupsShowPromises);
            hierarchyObj.groupDocs = hierarchyObj.groupDocs.concat(subGroupsFound);
        }

        const personsArray = groupToShow[0].persons;

        if (personsArray) {
            const personsFound = await PersonManager.getPersByIDs(personsArray, {});
            await Promise.all(personsFound);
            hierarchyObj.personsDocs = hierarchyObj.personsDocs.concat(personsFound);
        }
        return hierarchyObj;
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
