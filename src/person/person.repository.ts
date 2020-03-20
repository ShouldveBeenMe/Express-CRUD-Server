import { Request, Response } from 'express';
import { personModel } from './person.model';
import { Person } from './person.interface';

function createPerson(request: Request, response: Response) {
    const personData: Person = request.body;
    const createdPost = new personModel(personData);
    createdPost.save().then(savedPost => {
        response.send(savedPost);
    });
}
