import express, { Request, Response, NextFunction } from "express";
import path from "path";


const router = express.Router();

router.get('/vacations/images/:imageName', (request:Request,response:Response) => {
    const imageName = request.params.imageName;
    const imagePath = path.join(__dirname,'../1-assets/images',imageName);
    response.sendFile(imagePath);
});

export default router;
