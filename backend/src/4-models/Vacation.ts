import Joi from "joi";

class Vacation {
    public id:number;
    public destination:string;
    public description:string;
    public startDate:string;
    public endDate:string;
    public price:number;
    public photoPath:string;

    public constructor(vacation:Vacation){
        this.id = vacation.id;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.photoPath = vacation.photoPath;
    }

    private static validationSchema = Joi.object({
        id:Joi.number().integer().optional().positive(),
        destination:Joi.string().required().min(2).max(20),
        description:Joi.string().required().min(2),
        startDate:Joi.date().required().greater('now'),
        endDate:Joi.date().required().greater('now'),
        price:Joi.number().required().greater(50),
        photoPath:Joi.string().required().min(2).max(400)
    });

    public validate():string | undefined {
        const result = Vacation.validationSchema.validate(this);
        return result.error?.message;
    }
}

export default Vacation