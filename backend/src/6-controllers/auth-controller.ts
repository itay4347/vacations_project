import * as authLogic from '../5-logic/auth-logic';
import User from '../4-models/User';
import express, {Request,Response,NextFunction} from 'express';
import Credentials from '../4-models/Credentials';

const router = express.Router();

//http://localhost:3001/api/auth/register
router.post('/auth/register', async (request:Request,response:Response,next:NextFunction) => {

    try{
        const addedUser = new User(request.body);
        const token = await authLogic.register(addedUser);
        response.status(201).json(token);
    }catch(err:any){
        next(err);
    }
});

//http://localhost:3001/api/auth/login
router.post('/auth/login', async (request:Request,response:Response,next:NextFunction) => {

    try{
        const credentials = new Credentials(request.body);
        const token = await authLogic.login(credentials);
        response.json(token);
    }catch(err:any){
        next(err);
    }
});


export default router;