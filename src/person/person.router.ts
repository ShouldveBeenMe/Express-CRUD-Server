import { Router, Request, Response } from 'express';
import { PersonController } from './person.controller';

const personRouter: Router = Router();

// function sayHi() {
//     console.log('hi');
// }

personRouter.get('/', (req: Request, res: Response) => {
    PersonController.getPerson(req, res);
});
personRouter.post('/', (req: Request, res: Response) => {
    PersonController.addPerson(req, res);
});
personRouter.put('/:id', (req: Request, res: Response) => {
    PersonController.updatePerson(req, res);
});
personRouter.delete('/:id', (req: Request, res: Response) => {
    PersonController.deletePerson(req, res);
});

export { personRouter };
