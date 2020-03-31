/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express';
import { GroupManager } from './group.manager';

export class GroupController {
    static async addGroup(req: Request, res: Response) {
        // await console.log('to controller');
        console.log(req.body);
        res.json(await GroupManager.createGroup(req.body));
    }

    static async getGroup(req: Request, res: Response) {
        res.json(await GroupManager.getGroup(req.query));
    }

    static async getGroupHierarchy(req: Request, res: Response) {
        res.json(await GroupManager.getMainGroupHierarchy(req.query));
    }

    static async updateGroup(req: Request, res: Response) {
        const group = await GroupManager.updateGroup(req.params.id, req.body);
        res.send(group);
    }

    static async deleteGroup(req: Request, res: Response) {
        const group = await GroupManager.deleteGroup(req.params.id);
        res.send(group);
    }
}
