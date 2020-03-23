import express from 'express';
import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
import { AppRouter } from './router';
import * as configFile from './config';
import * as index from './index';

export async function startServer() {
    const { DEFAULT_PORT } = configFile;

    const portToListen = process.env.PORT || DEFAULT_PORT;
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(AppRouter);

    app.listen(portToListen, () => console.log(`Listening on port ${portToListen}\n`));

    index.connectToMongo();
}

// startServer();
