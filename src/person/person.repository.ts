/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import { Request, Response } from 'express';
import { PersonModel } from './person.model';
import { Person } from './person.interface';

export class PersonRepo {
    static async createPerson(person: Person) {
        // console.log('created');
        return PersonModel.create(person);
    }

    static async getPerson(filters: any) {
        return PersonModel.find(filters).exec();
    }

    static async updatePerson(personIDToUpdate: string, update: unknown) {
        return PersonModel.findOneAndUpdate({ id: personIDToUpdate }, update, { new: true }).exec();
    }

    static async deletePerson(personIDToDelete: string) {
        return PersonModel.findOneAndDelete({ id: personIDToDelete }).exec();
    }
}
