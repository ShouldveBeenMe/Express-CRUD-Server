import express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import {AppRouter} from './router';
const configFile = require('./config');
const index = require('./index');

const DEFAULT_PORT = configFile.DEFAULT_PORT;

const portToListen = process.env.PORT || DEFAULT_PORT;
const app = express();
const connection = mongoose.Connection;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(AppRouter);
app.listen()
app.use(bodyParser.json());
 
 
app.listen(portToListen, () => console.log(`Listening on port ${portToListen}`));

index.connectToMongo();