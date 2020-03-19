import mongoose from 'mongoose';
import Person from './person.interface';

const { Schema } = mongoose;

const PersonSchema = new Schema({
    name: { type: String, required: true, max: 100 },
    id: { type: Number, required: true },
});

// Export the model
export const PersonModel =  mongoose.model<Person & mongoose.Document>('Person', PersonSchema);
