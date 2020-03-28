/* eslint-disable @typescript-eslint/ban-types */
import { validate } from 'class-validator';
import { Schema } from 'mongoose';

type objID = Schema.Types.ObjectId;
export interface Group {
    // id: string;
    name: string;
    parentGroupID: string;
    persons?: Array<string>;
    subGroups?: Array<string>;
}
