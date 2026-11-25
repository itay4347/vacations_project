import { generateToken } from "../2-utils/jwtAuth";
import dal from "../2-utils/dal";
import User from "../4-models/User";
import { Error, ResourceNotFoundError, UnauthorizedError, ValidationError } from "../4-models/Error";
import { compareHash, hash } from "../2-utils/bcrypt";
import Role from "../4-models/Role";
import { OkPacket } from "mysql";
import Credentials from "../4-models/Credentials";

export const register = async (user:User):Promise<string> => {
    const error = user.validate();
    if(error) throw new ValidationError(error);
    const {firstName,lastName,email,password} = user;
    //a function i wrote on this page, if the email is taken throw a validation error.
    if(await isEmailTaken(email)) throw new ValidationError(`email ${email} is allready taken`);
    

    try{
        //getting the hashedPassword by using the hase function. and then insert it into the values.
        const hashedPassword = await hash(password);
        const sql = 'INSERT INTO users Values(DEFAULT,?,?,?,?,?)';
        const info = await dal.execute<OkPacket>(sql,[firstName,lastName,email,hashedPassword,Role.User]);
        user.id = info.insertId;
        user.role = Role.User;
        console.log(user);
        return generateToken(user);//generate a token based on the user object values.
    }catch(err){
        throw new Error('an error occurred while generating salt',500);
    }
}

export const login = async (credentials:Credentials):Promise<string> => {
    const error = credentials.validate();
    if(error) throw new ValidationError(error);

    const {email,password} = credentials

    //getting the user whose email is equal to the email from the credentials.
    const sql = `SELECT * FROM users WHERE email = ?`
    const users = await dal.execute<User[]>(sql,[email]);

    //the same message for a wrong email or a wrong password,
    //so the response doesn't reveal which emails are registered.
    const loginError = new UnauthorizedError('Incorrect email or password');
    if(users.length === 0) throw loginError;

    const user = users[0];
    //checks if the password from the credentials matches the hashed password in the database.
    const match = await compareHash(password,user.password);
    if(!match) throw loginError;

    return generateToken(user);
}

//this function checks if the email is taken, this takes the email argument,
//and count how many times this email is written. if it written more than 0 times it returns true,
//which says that the email is taken, else it returns false and you can continue with the register process.
export const isEmailTaken = async (email:string):Promise<boolean> => {

    const sql = `SELECT COUNT(id) AS emailsCount FROM users 
                 WHERE email = ?;
            `;
    const resultArray = await dal.execute<{emailsCount:number}[]>(sql,[email]);
    const count = resultArray[0]?.emailsCount;
    if(count > 0){
        return true;
    }else{
        return false;
    }       

}
//using the id argument, it gets the user with this specific id.
export const getOneUser = async (id:number):Promise<User> => {
    const sql = 'SELECT * FROM users WHERE id = ?;';
    const users = await dal.execute<User[]>(sql,[id]);
    if(users.length === 0) throw new ResourceNotFoundError(id);
    return users[0];
}