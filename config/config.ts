import { config } from "dotenv";

config();

const _conf = {
    port: process.env.PORT,
    Databaseurl: process.env.MONGODB_CONNECTION,
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD,
    cloud_api: process.env.CLOUDINARY_API,
    cloud_secret: process.env.CLOUDINARY_SECRET,
    frontendDomain: process.env.FRONTEND_DOMAIN


};

export const conf = Object.freeze(_conf)