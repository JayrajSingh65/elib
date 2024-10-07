import express, { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import userModel from "./userModel";
import { nextTick } from "process";

const createUser = async (req: Request,res:Response,next: NextFunction) => {

    const {name, email, password} = req.body;

    if(!name || !email || !password){
        const error = createHttpError(400, "all fields are requireed");

        return next(error);
    }



    const user = await userModel.findOne({email});
    
    if(user){
        const error = createHttpError(400, "user already exits!")
    
        return next(error)
    };


    const hashedPassword = bcrypt.hash(password, 10)

    res.json({message: "User Created"})

};





export {createUser};