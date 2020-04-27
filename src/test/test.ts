/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { runServer } from '../run';
import { PersonModel } from '../person/person.model';
import { Person } from '../person/person.interface';
// import * as dbHandler from './dbHandler';
import { GroupModel } from '../group/group.model';
import { Group } from '../group/group.interface';

// chai.use(chaiHttp);
// const { assert } = chai;

// describe('App integration testing', () => {
//     // eslint-disable-next-line func-names
//     before(async function() {
//         this.timeout(50000); // sometimes this function is long
//         await dbHandler.connect();
//     });

//     afterEach(async () => {
//         await dbHandler.clearDatabase();
//     });

//     after(async () => {
//         await dbHandler.closeDatabase();
//     });

//     describe('person routes', () => {
//         it('should work with all valid inputs', async () => {
//             const personObj = { firstName: 'a', lastName: 'a', age: 1, groupsInsideId: [] };

//             let personId;
//             await chai
//                 .request(server)
//                 .post(`/person/createPerson/`)
//                 .send(personObj)
//                 .then(res => {
//                     assert.equal(res.status, 201, 'createPerson');
//                     personId = res.text;
//                 });

//             await chai
//                 .request(server)
//                 .get(`/person/readPerson/${personId}`)
//                 .send()
//                 .then(res => {
//                     assert.equal(res.status, 200, 'readPerson');
//                     assert.deepInclude(res.body, personObj);
//                 });

//             await chai
//                 .request(server)
//                 .put(`/person/updatePerson/${personId}`)
//                 .send({ lastName: 'b' })
//                 .then(res => {
//                     assert.equal(res.status, 200, 'updatePerson');
//                     assert.deepInclude(res.body, personObj);
//                 });

//             await chai
//                 .request(server)
//                 .delete(`/person/deletePerson/${personId}`)
//                 .send()
//                 .then(res => {
//                     assert.equal(res.status, 200, 'deletePerson');
//                     assert.deepInclude(res.body, { firstName: 'a', lastName: 'b', age: 1, groupsInsideId: [] });
//                 });
//         }).timeout(300000); // in [ms]
//     });
