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
    },
    subGroups: {
        type: [String],
        required: false,
    },
});

// Export the model
export const GroupModel = mongoose.model<Group & mongoose.Document>('Group', GroupSchema);
