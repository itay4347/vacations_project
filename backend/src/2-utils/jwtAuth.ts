import jwt from 'jsonwebtoken';
import User from '../4-models/User';
import CONFIG from '../config';

export const generateToken = (user:User) => {

    const {id,firstName,lastName,email,role} = user
    const container = { user:{id,firstName,lastName,email,role} };

    const options = {expiresIn:'3h'};

    return jwt.sign(container,`${CONFIG.SECRET_KEY}`,options)
}