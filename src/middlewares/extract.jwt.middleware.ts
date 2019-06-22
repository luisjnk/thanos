import { RequestHandler, Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../utils/utils";
import * as jwt from 'jsonwebtoken';
import { findUserByID }from '../infra/actions/user.model'

export const extractJwtMiddleware = (): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        let authorization: string = req.get('authorization'); // Authorizatio Bear ds143
        let token: string = authorization ? authorization.split(' ')[1] : undefined;

        req['context'] = {};
        req['context']['authorization'] = authorization
        console.log('authorization', authorization)
        jwt.verify(token, JWT_SECRET, async (err, decoded: any) => {
    
            if (!token) { return next(); }
            if (err) { return next(); }
            console.log('decodedSub : ', decoded.sub)
            const user: any = await findUserByID(decoded.sub)
            console.log('userrru',user)
            if (user) {
                req['context']['user'] = {
                    id: user[0].idUser,
                    email: user[0].Email
                }

                console.log("req['context']['user']", req['context']['user'])

                return next();
            }

        })
    };

}