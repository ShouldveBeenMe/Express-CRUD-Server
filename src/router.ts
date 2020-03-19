import { Router } from 'express';

const AppRouter: Router = Router();

AppRouter.use('/', () => {
    throw new Error(`The server doesn't support this request`);
});

export { AppRouter };
