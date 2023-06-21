import Joi from 'joi'
import Role from './Role';

class User {
    public id:number;
    public firstName:string;
    public lastName:string;
    public email:string;
    public password:string;
    public role:Role;

    public constructor(user:User){
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role
    }
    private static validationSchema = Joi.object({
        id:Joi.number().optional().integer().positive(),
        firstName:Joi.string().required().min(2).max(15),
        lastName:Joi.string().required().min(2).max(15),
        email:Joi.string().required().min(6).max(45),
        password:Joi.string().required().min(4).max(20),
        role:Joi.forbidden()
    });

    public validate():string | undefined {
        const result = User.validationSchema.validate(this);
        return result.error?.message;
    }
}

export default User;