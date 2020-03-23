import mongoose from 'mongoose';
import { startServer } from './server';
import * as configFile from './config';

const { dbURL } = configFile;

async function dropDB() {
    await mongoose.connect(
        dbURL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        () => {
            /* Drop the DB */
            mongoose.connection.db.dropDatabase();
        },
    );
}
async function startTest() {
    await dropDB();
    await startServer();

    // const data = {
    //     name: 'lior',
    //     id: '123',
    // };
    // const xmlHttp = await new XMLHttpRequest();
    // await xmlHttp.open('POST', 'http://localhost:8200/person', false); // false for synchronous request
    // await xmlHttp.setRequestHeader('Content-type', 'application/json');
    // xmlHttp.send(JSON.stringify(data));
}

startTest();
