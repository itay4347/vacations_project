import express,{Request,Response,NextFunction} from 'express';
import User from '../4-models/User';
import Role from '../4-models/Role';
import { ForbiddenError, UnauthorizedError } from '../4-models/Error';

//this is a middleware i write add in every place that needs to be accessed only for users with the role - admin.
//if the user is not admin send an error.
export const isUserAdmin = async (request:Request,response:Response,next:NextFunction) => {
    
    const user = request?.user;
    const unauthorizedError = new UnauthorizedError("You are not authorized");
    const forbiddenError = new ForbiddenError("Permission is allowed only for admins.");

    if(!user){
        next(unauthorizedError);
    }

    const isAdmin = user?.role === Role.Admin;

    if(!isAdmin){
        next(forbiddenError);
    }
    next();


}