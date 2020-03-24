
import { OperationError } from "./errors";
import { Request,Response,NextFunction } from 'express';

export function handlerErrors ( err: OperationError,req: Request,res: Response,next: NextFunction ) {
    if (err.status) res.status(err.status);
    res.json(err.message);
}
