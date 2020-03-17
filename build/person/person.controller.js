"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = __importStar(require("mongoose"));
var person_model_1 = require("./person.model");
var StudentMongooseModel = mongoose.model('Student', person_model_1.PersonSchema);
var PersonController = /** @class */ (function () {
    function PersonController() {
    }
    PersonController.prototype.addNewStudent = function (req, res) {
        var newStudent = new StudentMongooseModel(req.body);
        newStudent.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            res.json(data);
        });
    };
    PersonController.prototype.getStudents = function (req, res) {
        StudentMongooseModel.find({}, function (err, data) {
            if (err) {
                res.send(err);
            }
            res.json(data);
        });
    };
    PersonController.prototype.getStudentById = function (req, res) {
        StudentMongooseModel.findById(req.params.studentId, function (err, data) {
            if (err) {
                res.send(err);
            }
            res.json(data);
        });
    };
    PersonController.prototype.updateStudent = function (req, res) {
        StudentMongooseModel.findOneAndUpdate({ _id: req.params.studentId }, req.body, { new: true }, function (err, data) {
            if (err) {
                res.send(err);
            }
            res.json(data);
        });
    };
    PersonController.prototype.deleteStudent = function (req, res) {
        StudentMongooseModel.findOneAndRemove({ _id: req.params.studentId }, function (err, data) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted student!' });
        });
    };
    PersonController.prototype.generateDummyData = function (req, res) {
        var data = [
            {
                "FirstName": "Sally",
                "LastName": "Baker",
                "School": "Mining",
                "StartDate": new Date("2012-02-20T08:30:00")
            }, {
                "FirstName": "Jason",
                "LastName": "Plumber",
                "School": "Engineering",
                "StartDate": new Date("2018-03-17T17:32:00")
            }, {
                "FirstName": "Sue",
                "LastName": "Gardner",
                "School": "Political Science",
                "StartDate": new Date("2014-06-20T08:30:00")
            }, {
                "FirstName": "Linda",
                "LastName": "Farmer",
                "School": "Agriculture",
                "StartDate": new Date("2014-06-20T08:30:00")
            }, {
                "FirstName": "Fred",
                "LastName": "Fisher",
                "School": "Environmental Sciences",
                "StartDate": new Date("2017-10-16T17:32:00")
            }
        ];
        StudentMongooseModel.collection.insert(data, function (err, docs) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully generated 5 sample documents!' });
        });
    };
    return PersonController;
}());
exports.PersonController = PersonController;
//# sourceMappingURL=person.controller.js.map