import { Request, Response } from 'express';
import { PersonModel } from './person.model';
import { PersonManager } from './person.manager';

export class PersonController {
    static async addPerson(req: Request, res: Response) {
        res.json(await PersonManager.createPerson(req.body));
    }

    static async getPerson(req: Request, res: Response) {
        res.json(await PersonManager.getPerson(req.query));
    }

    static async updatePerson(req: Request, res: Response) {
        const person = await PersonManager.updatePerson(req.params.id, req.body);
        res.send(person);
    }

    static async deletePerson(req: Request, res: Response) {
        const person = await PersonManager.deletePerson(req.params.id);
        res.send(person);
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
