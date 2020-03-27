import mongoose, { Schema } from 'mongoose';
import { Person } from './person.interface';

// const { Schema } = mongoose.Schema;

const PersonSchema = new Schema({
    id: {
        type: String,
        unique: [true, 'Person with this id is already exists'],
        required: [true, 'id isnt specified'],
    },
    name: { type: String, required: true },
    groups: { type: Array, required: false },
});

// Export the model
export const PersonModel = mongoose.model<Person & mongoose.Document>('Person', PersonSchema);
// export function personValidation
// export const PersonModel = mongoose.model('Person', PersonSchema);
// export const personModel = personSchema;
