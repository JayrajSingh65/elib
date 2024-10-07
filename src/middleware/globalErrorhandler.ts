import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { HttpError } from "http-errors";
import { conf } from "../../config/config";


const globalErrorHandler: ErrorRequestHandler = (
    err: HttpError, 
    req: Request, 
    res: Response, 
    next: NextFunction): void => 
{
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        message: err.message,
        errorStack: conf.env === "development" ? err.stack : "",
    });

};

export default globalErrorHandler;
