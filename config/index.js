import dotenv from 'dotenv';
dotenv.config()

export const {
    
    APP_PORT,
    MONGO_URI,
    DEBUG_MODE,
    SALT_FACTOR,
    APP_URL,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    REFRESH_SECRET,
    JWT_REFRESH_EXPIRES_IN

} = process.env
