/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import { Request, Response } from 'express';
import { GroupModel } from './group.model';
import { Group } from './group.interface';

export class GroupRepo {
    static async createGroup(group: Group) {
        // console.log('created');
        return GroupModel.create(group, (err: Error) => {
            if (err) throw err;
        });
    }

    static async getGroup(filters: any) {
        return GroupModel.find(filters).exec();
    }

    static async updateGroup(groupIDToUpdate: string, filters: any) {
        return GroupModel.findByIdAndUpdate(groupIDToUpdate, filters, { new: true }).exec();
    }

    static async deleteGroup(groupIDToDelete: string) {
        return GroupModel.findByIdAndDelete({ id: groupIDToDelete }).exec();
    }
}
