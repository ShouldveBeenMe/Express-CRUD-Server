import express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import {AppRouter} from './router';


const portToListen = process.env.PORT || 5000;
const app = express();
const connection = mongoose.Connection;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(AppRouter);
app.listen()
app.use(bodyParser.json());
 
app.post('/', (request, response) => {
  response.send(request.body);
});
 
app.listen(portToListen, () => console.log(`Listening on port ${portToListen}`));