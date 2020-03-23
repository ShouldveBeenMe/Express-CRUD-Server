import { Router } from 'express';
import { personRouter } from './person/person.router';

const AppRouter: Router = Router();

AppRouter.use('/person', personRouter);
AppRouter.use('/', () => {
    // console.log('not achieved general');
    throw new Error(`The server doesn't support this request`);
});

// AppRouter.get('/', (req, res) => {
//     console.log('achieved general');
//     res.send('route to home page example');
// });

export { AppRouter };
