import express, { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import {sign} from "jsonwebtoken"
import userModel from "./userModel";

import { conf } from "../../config/config";
import { User } from "./userTypes";



const createUser = async (req: Request,res:Response,next: NextFunction) => {

    const {name, email, password} = req.body;

    if(!name || !email || !password){
        const error = createHttpError(400, "all fields are requireed");

        return next(error);
    }


try {
    const user = await userModel.findOne({email});
    
    if(user){
        const error = createHttpError(400, "user already exits!")
    
        return next(error)
    };
    
} catch (err) {
    return next(createHttpError(500, "Error while getting user"))
}


    const hashedPassword = await bcrypt.hash(password, 10);


let newUser: User ;
    try {
        newUser = await userModel.create({
            name,
            email,
            password: hashedPassword
    
        });
        const token = sign({sub:  newUser._id}, conf.jwtSecret as string, {expiresIn: "7d"})
        res.json({accesToken: token})
        
    } catch (error) {
        
        return next(createHttpError(500, "Error while creatiing user"))
    }




};





export {createUser};