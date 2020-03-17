
import * as mongoose from 'mongoose';

async function connectToServer() {
    Server.startServer();
    await mongoose.connect('mongodb://localhost/groupsDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("connected");
}

connectToServer();
