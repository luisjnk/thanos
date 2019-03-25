import { RequestHandler, Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../utils/utils";
import * as jwt from 'jsonwebtoken';

export const extractJwtMiddleware = (): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        let authorization: string = req.get('authorization'); // Authorizatio Bear ds143
        let token: string = authorization ? authorization.split(' ')[1] : undefined;

        req['context'] = {};
        req['context']['authorization'] = authorization

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (!token) { return next(); }
        })
    };

}