import dotenv from 'dotenv';

dotenv.config();

const CONFIG = {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    PORT:process.env.PORT,
    FRONT_END_URL:'http://localhost:3000',
    SECRET_KEY:process.env.SECRET_KEY
}

export default CONFIG;