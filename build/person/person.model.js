"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
// const { Schema } = mongoose.Schema;
var PersonSchema = new mongoose_1.Schema({
    id: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    groups: { type: Array, required: false },
});
// Export the model
exports.PersonModel = mongoose_1.default.model('Person', PersonSchema);
// export const PersonModel = mongoose.model('Person', PersonSchema);
// export const personModel = personSchema;
//# sourceMappingURL=person.model.js.map