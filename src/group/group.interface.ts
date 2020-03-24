/* eslint-disable @typescript-eslint/ban-types */
import { validate } from 'class-validator';

export interface Group {
    id: string;
    name: string;
    parentGroupID: string;
    persons?:string[];
    groups?: string[];
}
