import express, { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import {sign} from "jsonwebtoken"
import userModel from "./userModel";

import { conf } from "../../config/config";



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


    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userModel.create({
        name,
        email,
        password: hashedPassword

    });

    const token = sign({sub: (await newUser)._id}, conf.jwtSecret as string, {expiresIn: "7d"})

    res.json({accesToken: token})

};





export {createUser};