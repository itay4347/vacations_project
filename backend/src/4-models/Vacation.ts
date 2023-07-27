import Joi from "joi";
import {UploadedFile} from 'express-fileupload'

class Vacation {
    public id:number;
    public destination:string;
    public description:string;
    public startDate:string;
    public endDate:string;
    public price:number;
    public image?:UploadedFile;
    public imageName?:string;

    public constructor(vacation:Vacation){
        this.id = vacation.id;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.image = vacation.image;
        this.imageName = vacation.imageName
    }

    private static validationSchema = Joi.object({
        id:Joi.number().integer().optional().positive(),
        destination:Joi.string().required().min(2).max(20),
        description:Joi.string().required().min(2),
        startDate:Joi.date().required(),
        endDate:Joi.date().required().greater('now'),
        price:Joi.number().required().greater(50),
        image:Joi.object().optional(),
        imageName:Joi.string().optional()
    });

    public validate():string | undefined {
        const result = Vacation.validationSchema.validate(this);
        return result.error?.message;
    }
}

export default Vacation