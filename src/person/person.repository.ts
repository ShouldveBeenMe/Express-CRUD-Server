// import { Request, Response } from 'express';
import { PersonModel } from './person.model';
import { Person } from './person.interface';

export class PersonRepo {
    static async createPerson(person: Person) {
        return PersonModel.create(person);
    }

    static async getPerson(filters: any) {
        return PersonModel.find(filters).exec();
    }

    static async updatePerson(personIDToUpdate: string, filters: any) {
        return PersonModel.findByIdAndUpdate(personIDToUpdate, filters, { new: true }).exec();
    }

    static async deletePerson(personIDToDelete: string) {
        return PersonModel.findByIdAndDelete(personIDToDelete);
    }
}
