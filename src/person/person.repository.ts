// import { Request, Response } from 'express';
import { PersonModel } from './person.model';
import { Person } from './person.interface';

export class PersonRepo {
    static async createPerson(person: Person) {
        return PersonModel.create(person);
    }

    static async getPerson(filter: any) {
        return PersonModel.find(filter);
    }

    static async updatePerson(personToUpdate: Person, filter: any) {
        return PersonModel.create(personToUpdate, filter);
    }

    static async deletePerson(personToDelete: Person) {
        return PersonModel.deleteOne(personToDelete);
    }
}
