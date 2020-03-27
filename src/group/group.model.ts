import mongoose, { Schema } from 'mongoose';
import { Group } from './group.interface';

const GroupSchema = new Schema({
    id: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    parentGroupID: { type: String },
    persons: { type: [String], required: false },
    subGroups: { type: [String], required: false },
});

// Export the model
export const GroupModel = mongoose.model<Group & mongoose.Document>('Group', GroupSchema);
