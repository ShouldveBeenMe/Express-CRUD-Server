import { Router } from 'express';


const AppRouter: Router = Router();

AppRouter.use( '/',() => { throw new error( `The server doesn't support this request` ); } )

export { AppRouter };
