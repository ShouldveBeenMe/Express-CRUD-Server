/* eslint-disable no-return-await */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import mongoose, { Schema, Document } from 'mongoose';
import { DuplicateFieldError, DataBaseError } from '../errors';
import { PersonRepo } from './person.repository';
import { Person } from './person.interface';
import { checkIfDuplicateExists } from '../funcUtils';

export class PersonManager {
    static async createPerson(newPerson: Person) {
        try {
            return await PersonRepo.createPerson(newPerson);
        } catch (e) {
            if (e.code === 11000 && e.name === 'MongoError') {
                throw new DuplicateFieldError(`${e.keyValue.id} Already Exist`);
            }
        }
    }

    static async getPerson(filter: any) {
        try {
            return await PersonRepo.getPerson(filter);
        } catch (e) {
            if (e.code === 11000 && e.name === 'MongoError') {
                throw new DataBaseError(`${e.keyValue.id} Already Exist`);
            }
        }
    }

    static async updatePerson(personID: string, update: unknown) {
        return await PersonRepo.updatePerson(personID, update);
    }

    static async deletePerson(personID: string) {
        return await PersonRepo.deletePerson(personID);
    }

    static checkIfPersonExists() {}
}
