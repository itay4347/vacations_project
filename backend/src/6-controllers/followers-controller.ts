import express, {Request,Response,NextFunction} from 'express';
import * as followersLogic from '../5-logic/followers-logic';
import LikedVacation from '../4-models/LikedVacation';


const router = express.Router();

//http://localhost:3001/api/followersCount
router.get('/followersCount', async (request:Request,response:Response,next:NextFunction) => {

    try{
        const followersCount = await followersLogic.getFollowersCount();
        response.json(followersCount);
    }catch(err){
        next(err);
    }
});

router.get('/followers/:userId/vacations/:vacationId', 
            async (request:Request,response:Response,next:NextFunction) => {
    try{
        const userId = +request.params.userId;
        const vacationId = +request.params.vacationId;

        if (isNaN(userId) || isNaN(vacationId)) {
            response.status(400).send('userId and vacationId must be numbers');
            return;
          }

        const isFollowed = await followersLogic.checkIfUserLikedVacation(userId,vacationId);
        if(isFollowed === undefined){
            response.status(200).send(false);
            return
        }
        response.status(200).send(isFollowed);
    }catch(err){
        next(err);
    }
});

//http://localhost:3001/api/followers/vacations/:userId
router.get('/followers/vacations/:userId', async (request:Request,response:Response,next:NextFunction) => {

    try{
        const userId = +request.params.userId;
        const vacationsLikedByUser = await followersLogic.getVacationsLikedPerUser(userId);
        response.json(vacationsLikedByUser);
    }catch(err){
        next(err);
    }
});

//http://localhost:3001/api/followers
router.get('/followers', async (request:Request,response:Response,next:NextFunction) => {

    try{
        const likedVacations = await followersLogic.getAllLikedVacations();
        response.json(likedVacations);
    }catch(err){
        next(err);
    }
});
//http://localhost:3001/api/followers
router.post('/followers', async (request:Request,response:Response,next:NextFunction) => {

    try{
        const likedVacation = new LikedVacation(request.body);
        const addedLikedVacation = await followersLogic.addLikedVacation(likedVacation);
        response.json(addedLikedVacation);
    }catch(err){
        next(err);
    }
});
//http://localhost:3001/api/followers/:userId/vacations/:vacationId
router.delete(
    '/followers/:userId/vacations/:vacationId',
     async (request:Request,response:Response,next:NextFunction) => {

    try{
        const userId = +request.params.userId;
        const vacationId = +request.params.vacationId;
        await followersLogic.deleteLikedVacation(userId,vacationId);
        response.status(202).send('follower has successfully deleted');
    }catch(err){
        next(err);
    }
});

export default router;