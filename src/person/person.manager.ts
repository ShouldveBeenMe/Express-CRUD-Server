// import mongoose, { Schema, Document } from 'mongoose';
import { PersonRepo } from './person.repository';
import { Person } from './person.interface';

export class PersonManager {
    static async createPerson(newPerson: Person) {
        return PersonRepo.createPerson(newPerson);
    }

    static async getPerson(filter: any) {
        return PersonRepo.getPerson(filter);
    }

    static async update(personToUpdate: Person, filter: any) {
        return PersonRepo.updatePerson(personToUpdate, filter);
    }

    static async deletePerson(personToDelete: Person) {
        return PersonRepo.deletePerson(personToDelete);
    }
}
