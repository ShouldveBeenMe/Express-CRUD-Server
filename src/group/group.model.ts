import mongoose, { Schema } from 'mongoose';
// import { validate, extend } from 'mongoose-validator';
import { Group } from './group.interface';
import { checkIfDuplicateExists } from '../funcUtils';

type objID = Schema.Types.ObjectId;

const GroupSchema = new Schema({
    id: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    parentGroupID: { type: String },
    persons: {
        type: [String],
        required: false,
        // validate: {
        //     validator: (persArr: [string]) => {
        //         return checkIfDuplicateExists(persArr);
        //     },
        // },
        // message: 'Can no be two persons in the same group',
    },
    subGroups: {
        type: [String],
        required: false,
        // maxlength: [6, 'OOPS'],
        // validate: {
        //     validator: (grpArr: [string]) => {
        //         return checkIfDuplicateExists(grpArr);
        //     },
        // },
        // message: 'Can no be two groups in the same group',
    },
});

// Export the model
export const GroupModel = mongoose.model<Group & mongoose.Document>('Group', GroupSchema);
