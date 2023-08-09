import express, { Request, Response, NextFunction } from "express";
import path from "path";


const router = express.Router();
//http://localhost:3001/api/vacations/images/:imageName
router.get('/vacations/images/:imageName', (request:Request,response:Response) => {
    const imageName = request.params.imageName;
    const imagePath = path.join(__dirname,'../1-assets/images',imageName);
    response.sendFile(imagePath);//sets the imagepath into an api route.
});


export default router;
