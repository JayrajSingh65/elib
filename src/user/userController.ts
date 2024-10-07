import express, { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

const createUser = (req: Request,res:Response,next: NextFunction) => {

    const {name, email, password} = req.body;

    if(!name || !email || !password){
        const error = createHttpError(400, "all fields are requireed");

        return next(error);
    }




    res.json({message: "User Created"})

};


export {createUser};