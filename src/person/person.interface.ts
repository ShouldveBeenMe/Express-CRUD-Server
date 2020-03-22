import { validate } from 'class-validator';

export interface Person {
    _id: string;
    firstName: string;
    lastName: string;
    fullName: string;
}
