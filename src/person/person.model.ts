import mongoose, { Schema } from 'mongoose';
import { Person } from './person.interface';

// const { Schema } = mongoose.Schema;

const PersonSchema = new Schema({
    id: { type: String, unique: true , required: true},
    name: { type: String , required: true},
    groups: { type: Array, required: false },
});

// Export the model
export const PersonModel = mongoose.model<Person & mongoose.Document>('Person', PersonSchema);
// export const PersonModel = mongoose.model('Person', PersonSchema);
// export const personModel = personSchema;
