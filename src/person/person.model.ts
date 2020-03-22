import mongoose, { Schema } from 'mongoose';
import { Person } from './person.interface';

// const { Schema } = mongoose.Schema;

const PersonSchema = new Schema({
    klik: { type: String },
    // name: { type: String, required: true },
    // id: { type: Number, required: true },
});

// Export the model
export const PersonModel = mongoose.model<Person & mongoose.Document>('Person', PersonSchema);
// export const personModel = personSchema;
