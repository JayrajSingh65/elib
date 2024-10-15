import { NextFunction, Request, Response} from "express";
import createHttpError from "http-errors";
import { verify } from "jsonwebtoken";
import { conf } from "../../config/config";

export interface Authrequest extends Request {
    userId: string
}

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization");

    if(!token){
    return next(createHttpError(401, "token is required for authentication"))
    }

    try {
        const parsedtoken = token.split(" ")[1]
    
        const decode = verify(parsedtoken, conf.jwtSecret as string);
        const _req = req as Authrequest;
        _req.userId = decode.sub as string; 
        
    } catch (error) {
        return next(createHttpError(401,"token is expired"))
    }


    next();

};

export default authenticate