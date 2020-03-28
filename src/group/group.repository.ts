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
        // return await GroupModel.find(filters).exec();
        // return new Promise<Group & Document>(resolve => {
        //     GroupModel.find(filters, (err: Error, group: Group & Document) => {
        //         resolve(group);
        //     });
        // });
        const foundGroupPromise = await GroupModel.find(filters).exec();
        return foundGroupPromise;

        // GroupModel.find(filters)
        //     .exec()
        //     .then(result => foundGroup);
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
