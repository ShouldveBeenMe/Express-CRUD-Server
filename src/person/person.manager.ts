/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import mongoose, { Schema, Document } from 'mongoose';
import { PersonRepo } from './person.repository';
import { Person } from './person.interface';

export class PersonManager {
    static async createPerson(newPerson: Person) {
        return await PersonRepo.createPerson(newPerson);
    }

    static async getPerson(filter: any) {
        return await PersonRepo.getPerson(filter);
    }

    static async updatePerson(personID: string, filter: any) {
        return await PersonRepo.updatePerson(personID, filter);
    }

    static async deletePerson(personID: string) {
        return await PersonRepo.deletePerson(personID);
    }
}
