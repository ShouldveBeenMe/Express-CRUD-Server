
import mongoose from 'mongoose';
import * as configFile from './config';

//require chalk module to give colors to console text
var chalk = require('chalk');

//require database URL from properties file
var dbURL = configFile.dbURL;

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

mongoose.connection.on('connected', function(){
    console.log(connected("Mongoose default connection is open to ", dbURL));
});

mongoose.connection.on('error', function(err: Error){
    console.log(error("Mongoose default connection has occured "+err+" error"));
});

mongoose.connection.on('disconnected', function(){
    console.log(disconnected("Mongoose default connection is disconnected"));
});

process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log(termination("Mongoose default connection is disconnected due to application termination"));
        process.exit(0)
    });
});

//export this function and imported by server.js
export async function connectToMongo(){

    await mongoose.connect('mongodb://localhost/groupsDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

}