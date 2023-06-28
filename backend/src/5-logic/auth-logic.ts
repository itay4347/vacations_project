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
    if(await isEmailTaken(email)) throw new ValidationError(`email ${email} is allready taken`);
    

    try{
        const hashedPassword = await hash(password);
        const sql = 'INSERT INTO users Values(DEFAULT,?,?,?,?,?)';
        const info = await dal.execute<OkPacket>(sql,[firstName,lastName,email,hashedPassword,Role.User]);
        user.id = info.insertId;
        return generateToken(user);
    }catch(err){
        throw new Error('an error occurred while generating salt',500);
    }
}

export const login = async (credentials:Credentials):Promise<string> => {
    const error = credentials.validate();
    if(error) throw new ValidationError(error);

    const {email,password} = credentials

    try{
        const sql = `SELECT * FROM users WHERE email = ?`
        const users = await dal.execute<User[]>(sql,[email]);

        if(users.length === 0) throw new UnauthorizedError('Incorrect email has been entered');

        const user = users[0];
        const match = await compareHash(password,user.password);

        if(!match) throw new UnauthorizedError('Incorrect password has been entered');
        return generateToken(user);
        
    }catch(err){
        throw new Error('an error occurred while generating salt',500);
    }
}

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

export const getOneUser = async (id:number):Promise<User> => {
    const sql = 'SELECT * FROM users WHERE id = ?;';
    const users = await dal.execute<User[]>(sql,[id]);
    if(users.length === 0) throw new ResourceNotFoundError(id);
    return users[0];
}