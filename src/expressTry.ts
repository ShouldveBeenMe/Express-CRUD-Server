/* eslint-disable radix */
import express from 'express';

// For POST-Support
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/sayHello', (request, response) => {
    const { a } = request.body;
    const { b } = request.body;

    const c = parseInt(a) + parseInt(b);
    response.send(`Result : ${c}`);
    console.log(`Result : ${c}`);
});

app.listen(3000);
