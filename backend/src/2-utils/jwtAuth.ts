import jwt from 'jsonwebtoken';
import User from '../4-models/User';
import CONFIG from '../config';

//a function that gets the user and generate a token for him using the jwt algorithem.
export const generateToken = (user:User) => {

    const {id,firstName,lastName,email,role} = user
    const container = { user:{id,firstName,lastName,email,role} };

    return jwt.sign(container,`${CONFIG.SECRET_KEY}`)
}