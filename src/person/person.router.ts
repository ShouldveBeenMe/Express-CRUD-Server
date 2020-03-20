import { Router } from 'express';
import { PersonController } from './person.controller';

const personRouter: Router = Router();

personRouter.get('/', PersonController.getPerson);
personRouter.post('/', PersonController.addPerson);
personRouter.put('/:id', PersonController.updatePerson);
personRouter.delete('/:id', PersonController.deletePerson);
