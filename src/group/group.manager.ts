/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import mongoose, { Schema, Document } from 'mongoose';
import { DuplicateFieldError, DataBaseError } from '../errors';
import { GroupRepo } from './group.repository';
import { Group } from './group.interface';



export class GroupManager {
    static async createGroup(newGroup: Group) {
        try {
            return await GroupRepo.createGroup(newGroup);
        }
        catch(e)
        {
            if (e.code === 11000 && e.name === 'MongoError') {
                throw new DuplicateFieldError(`${e.keyValue.id} Already Exist`);
            }

        }

    }

    static async getGroup(filter: any) {
        try {
            return await GroupRepo.getGroup(filter);
        }
        catch(e)
        {
            if (e.code === 11000 && e.name === 'MongoError') {
                throw new DataBaseError(`${e.keyValue.id} Already Exist`);
            }

        }
    }

    static async updateGroup(GroupID: string, filter: any) {
        return await GroupRepo.updateGroup(GroupID, filter);
    }

    static async deleteGroup(GroupID: string) {
        return await GroupRepo.deleteGroup(GroupID);
    }
}
