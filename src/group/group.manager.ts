/* eslint-disable no-return-await */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import mongoose, { Schema, Document } from 'mongoose';
import { DuplicateFieldError, DataBaseError } from '../errors';
import { GroupRepo } from './group.repository';
import { Group } from './group.interface';
import { checkIfDuplicateExists } from '../funcUtils';

export class GroupManager {
    static async createGroup(newGroup: Group) {
        try {
            console.log('achieved');
            return await GroupRepo.createGroup(newGroup);
        } catch (e) {
            if (e.code === 11000 && e.name === 'MongoError') {
                throw new DuplicateFieldError(`${e.keyValue.id} Already Exist`);
            }
        }
    }

    static async getGroup(filter: any) {
        try {
            return await GroupRepo.getGroup(filter);
        } catch (e) {
            if (e.code === 11000 && e.name === 'MongoError') {
                throw new DataBaseError(`${e.keyValue.id} Already Exist`);
            }
        }
    }

    static async updateGroup(GroupID: string, filter: any) {
        if (this.getGroup({ id: GroupID })) {
            return await GroupRepo.updateGroup(GroupID, filter);
        }
        throw Error('Group isnt exist');
    }

    static async deleteGroup(GroupID: string) {
        return await GroupRepo.deleteGroup(GroupID);
    }

    static isValidSubGroupsArray(subGroupArray: string[]) {
        return checkIfDuplicateExists(subGroupArray);
    }
}
