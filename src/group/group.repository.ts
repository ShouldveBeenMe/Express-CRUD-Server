/* eslint-disable no-return-await */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import { Request, Response } from 'express';
import { Schema } from 'mongoose';
import { GroupModel } from './group.model';
import { Group } from './group.interface';

type objID = Schema.Types.ObjectId;
export class GroupRepo {
    static async createGroup(group: Group) {
        // console.log('created');
        return await GroupModel.create(group, (err: Error) => {
            if (err) throw err;
        });
    }

    static async getGroup(filters: any) {
        const foundGroupPromise = await GroupModel.find(filters).exec();
        return foundGroupPromise;
    }

    static async updateGroup(groupIDToUpdate: string, update: unknown) {
        return await GroupModel.findOneAndUpdate({ id: groupIDToUpdate }, update, {
            runValidators: true,
            new: true,
        }).exec();
    }

    static async deleteGroup(groupIDToDelete: string) {
        return await GroupModel.findOneAndDelete({ id: groupIDToDelete }).exec();
    }
}
