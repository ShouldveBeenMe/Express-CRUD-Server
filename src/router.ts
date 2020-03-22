import { Router } from 'express';
import { personRouter } from './person/person.router';

const AppRouter: Router = Router();

AppRouter.use('/person', personRouter);
AppRouter.use('/', () => {
    throw new Error(`The server doesn't support this request`);
});

export { AppRouter };
