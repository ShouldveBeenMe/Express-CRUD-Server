import mongoose, { Schema } from 'mongoose';
import { Person } from './person.interface';

// const { Schema } = mongoose.Schema;

const personSchema = new Schema({
    name: { type: String, required: true, max: 100 },
    id: { type: Number, required: true },
});

// Export the model
export const personModel = mongoose.model<Person & mongoose.Document>('Person', personSchema);
