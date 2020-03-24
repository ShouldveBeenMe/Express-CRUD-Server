import { Request, Response, NextFunction } from 'express';
import { OperationError } from './errors';

export function handlerErrors(err: OperationError, req: Request, res: Response, next: NextFunction) {
    if (err.status) res.status(err.status);
    res.json(err.message);
}
