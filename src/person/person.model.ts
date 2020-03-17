import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let PersonSchema = new Schema({
    name: {type: String, required: true, max: 100},
    id: {type: Number, required: true},
});


// Export the model
module.exports = mongoose.model('Person', PersonSchema);