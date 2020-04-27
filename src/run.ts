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
            // mongoose.connection.db.dropDatabase();
        },
    );
}
async function runServer() {
    await dropDB();
    await startServer();
}

runServer();

export { runServer };
