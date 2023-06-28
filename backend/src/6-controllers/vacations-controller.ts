import express, { Request, Response, NextFunction } from "express";
import * as vacationLogic from "../5-logic/vacations-logic";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import { checkUserRole} from "../3-middleware/isUserAdmin";
import Role from "../4-models/Role";

const router = express.Router(); // Capital R

// GET http://localhost:3001/api/vacations
router.get("/vacations", [verifyLoggedIn,checkUserRole(Role.User)], async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await vacationLogic.getAllVacations();
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;