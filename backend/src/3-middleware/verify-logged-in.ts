import {Request,Response,NextFunction} from 'express';
import { UnauthorizedError } from '../4-models/Error';
import jwt, { JwtPayload } from 'jsonwebtoken';
import CONFIG from '../config';
import User from '../4-models/User';
import { getOneUser } from '../5-logic/auth-logic';

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

//this function takes the token and the secretKey of the app, if this is correct, the user is verified...
//this is used to make sure i cant do cetain things without being logged-in.
const verifyLoggedIn = async (request:Request,response:Response,next:NextFunction) => {
    const token = request.headers.authorization?.split(' ')[1];

    if(!token){
        const error = new UnauthorizedError('Unauthorized');
        next(error);
        return
    }
    
    jwt.verify(token,`${CONFIG.SECRET_KEY}`,async (err,decoded) => {
        if(err){
            const error = new UnauthorizedError('Unauthorized');
            next(error);
        }else{
            const {user} = decoded as JwtPayload
            request.user = await getOneUser(user.id);
            next();

        }
    });
}

export default verifyLoggedIn;