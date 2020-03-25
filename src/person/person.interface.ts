/* eslint-disable @typescript-eslint/ban-types */
import { validate } from 'class-validator';

export interface Person {
    // id: string;
    name: string;
    groups?: string[];
}
