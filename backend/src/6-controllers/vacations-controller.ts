import express, { Request, Response, NextFunction } from "express";
import * as vacationLogic from "../5-logic/vacations-logic";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import Role from "../4-models/Role";
import { isUserAdmin } from "../3-middleware/isUserAdmin";
import Vacation from "../4-models/Vacation";

const router = express.Router(); // Capital R

// GET http://localhost:3001/api/vacations
router.get("/vacations", [verifyLoggedIn], async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await vacationLogic.getAllVacations();
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/vacations
router.post("/vacations", [verifyLoggedIn,isUserAdmin], async (request: Request, response: Response, next: NextFunction) => {
    try{
        request.body.image = request.files?.image;
        const vacation = new Vacation(request.body);
        const addedVacation = await vacationLogic.addNewVacation(vacation);
        response.status(201).json(addedVacation);  
    }catch(err:any){
        next(err);
    }
});

//PUT http://localhost:3001/api/vacations/:id

router.put("/vacations/:id([0-9]+)", [verifyLoggedIn,isUserAdmin], async (request:Request,response:Response,next:NextFunction) => {
    try{
        const id = +request.params.id;
        request.body.id = id;
        request.body.image = request.files?.image;
        
        const vacation = new Vacation(request.body);
        const updatedVacation = await vacationLogic.updateVacation(vacation);
        response.json(updatedVacation);
    }catch(err:any){
        next(err);
    }
});

export default router;