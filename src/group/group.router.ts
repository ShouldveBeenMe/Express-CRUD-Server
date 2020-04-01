import { Router, Request, Response } from 'express';
import { GroupController } from './group.controller';

const groupRouter: Router = Router();

// function sayHi() {
//     console.log('hi');
// }

groupRouter.get('/', (req: Request, res: Response) => {
    GroupController.getGroup(req, res);
});
groupRouter.get('/hierarchy/', (req: Request, res: Response) => {
    GroupController.getGroupHierarchy(req, res);
});

groupRouter.get('/:personname/', (req: Request, res: Response) => {
    GroupController.getPersonFromGroup(req, res);
});

groupRouter.post('/', (req: Request, res: Response) => {
    GroupController.addGroup(req, res);
});
groupRouter.put('/:id', GroupController.updateGroup);
groupRouter.delete('/:id', GroupController.deleteGroup);

export { groupRouter };
