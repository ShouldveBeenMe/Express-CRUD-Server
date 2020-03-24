"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var person_controller_1 = require("./person.controller");
var personRouter = express_1.Router();
exports.personRouter = personRouter;
// function sayHi() {
//     console.log('hi');
// }
personRouter.get('/', function (req, res) {
    person_controller_1.PersonController.getPerson(req, res);
});
personRouter.post('/', function (req, res) {
    person_controller_1.PersonController.addPerson(req, res);
});
personRouter.put('/:id', person_controller_1.PersonController.updatePerson);
personRouter.delete('/:id', person_controller_1.PersonController.deletePerson);
//# sourceMappingURL=person.router.js.map