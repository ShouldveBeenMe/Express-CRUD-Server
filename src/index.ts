/* eslint-disable no-console */
/* eslint-disable import/extensions */
import mongoose from 'mongoose';
//  require chalk module to give colors to console text
import chalk from 'chalk';
import * as configFile from './config';

//  require database URL from properties file
const { dbURL } = configFile;

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

mongoose.connection.on('connected', () => {
    console.log(connected('Mongoose default connection is open to ', dbURL));
});

mongoose.connection.on('error', (err: Error) => {
    console.log(error(`Mongoose default connection has occured ${err} error`));
});

mongoose.connection.on('disconnected', () => {
    console.log(disconnected('Mongoose default connection is disconnected'));
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log(termination('Mongoose default connection is disconnected due to application termination'));
        process.exit(0);
    });
});

//  export this function and imported by server.js
export default async function connectToMongo(): Promise<void> {
    await mongoose.connect('mongodb://localhost/groupsDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}
