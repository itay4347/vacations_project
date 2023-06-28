import express,{Request,Response,NextFunction} from 'express';
import User from '../4-models/User';
import Role from '../4-models/Role';
import { ForbiddenError } from '../4-models/Error';

export const checkUserRole = (requiredRole:Role) => {
    
    return (request:Request,response:Response,next:NextFunction) => {
        const userRole = request.user?.role;

        if(userRole === requiredRole){
            next();
        }else{
            response.status(403).json("You don't have permission to access this resource");
            throw new ForbiddenError("You don't have permission to access this resource");
        }
    }
}