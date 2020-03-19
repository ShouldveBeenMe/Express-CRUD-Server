import { Request, Response } from 'express';
import { PersonModel } from './person.model';
import Person from './person.interface';

function createPerson(request: Request, response: Response): void {
    const personData: Person = request.body;
    const createdPerson = new PersonModel(personData);
    createdPerson.save().then(createdPerson => {
      response.send(createdPerson);
    })
}