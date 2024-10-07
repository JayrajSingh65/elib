import { config } from "dotenv";

config();

const _conf = {
    port: process.env.PORT,
    Databaseurl: process.env.MONGODB_CONNECTION,
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET

};

export const conf = Object.freeze(_conf)