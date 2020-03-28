/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import { Request, Response } from 'express';
import { runInNewContext } from 'vm';
import { Schema } from 'mongoose';
import { PersonModel } from './person.model';
import { Person } from './person.interface';

type objID = Schema.Types.ObjectId;

export class PersonRepo {
    static createPerson(newPerson: Person) {
        return PersonModel.create(newPerson, (err: Error) => {
            if (err) throw err;
        });
    }

    static getPerson(filters: any) {
        return PersonModel.find(filters).exec();
    }

    static updatePerson(personIDToUpdate: string, update: unknown) {
        console.log(update);
        return PersonModel.findOneAndUpdate({ id: personIDToUpdate }, update, { new: true }).exec();
    }

    static deletePerson(personIDToDelete: string) {
        return PersonModel.findOneAndDelete({ id: personIDToDelete }).exec();
    }
}
