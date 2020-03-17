"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
exports.PersonSchema = new Schema({
    name: { type: String, required: true, max: 100 },
    id: { type: Number, required: true },
});
// Export the model
// module.exports = mongoose.model('Person', PersonSchema);
//# sourceMappingURL=person.model.js.map