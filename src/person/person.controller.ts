
import * as mongoose from 'mongoose';
import  {PersonSchema} from './person.model';
import { Request, Response } from 'express';

const PersonMongooseModel = mongoose.model('Student', PersonSchema);

export class PersonController { 

    static addPerson (req: Request, res: Response) {   

        let newPerson = new PersonMongooseModel(req.body);

        newPerson.save((err, data) => {
            if (err){
                res.send(err);
            }    
            res.json(data);
        });
    }

    static getPerson (req: Request, res: Response) {           
        PersonMongooseModel.find({}, (err, data) => {
            if (err){
                res.send(err);
            }
            res.json(data);
        });
    }


    static updatePerson (req: Request, res: Response) {           
        PersonMongooseModel.findOneAndUpdate({ _id: req.params.id }, req.body, 
            (err, data) => {
            if (err){
                res.send(err);
            }
            res.json(data);
        });
    }

    static deletePerson(req: Request, res: Response) {           
        PersonMongooseModel.findOneAndRemove({ _id: req.params.id }, (err, data) => {
            if (err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted student!'});
        });
    }

    // public generateDummyData (req: Request, res: Response) {     
    //     var data = [
    //         {
    //         "FirstName":"Sally",
    //         "LastName":"Baker",
    //         "School":"Mining",
    //         "StartDate": new Date("2012-02-20T08:30:00")
    //         },{
    //         "FirstName":"Jason",
    //         "LastName":"Plumber",
    //         "School":"Engineering",
    //         "StartDate": new Date("2018-03-17T17:32:00")
    //         },{
    //         "FirstName":"Sue",
    //         "LastName":"Gardner",
    //         "School":"Political Science",
    //         "StartDate": new Date("2014-06-20T08:30:00")
    //         },{
    //         "FirstName":"Linda",
    //         "LastName":"Farmer",
    //         "School":"Agriculture",
    //         "StartDate": new Date("2014-06-20T08:30:00")
    //         },{
    //         "FirstName":"Fred",
    //         "LastName":"Fisher",
    //         "School":"Environmental Sciences",
    //         "StartDate": new Date("2017-10-16T17:32:00")
    //         }
    //     ];
          
    //     StudentMongooseModel.collection.insert(data, function (err, docs) { 
    //         if (err){
    //             res.send(err);
    //         }
    //         res.json({ message: 'Successfully generated 5 sample documents!'});
    //     });
    
    // }
}