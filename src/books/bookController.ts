
import express, { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    const {title, description, author} = req.body;

    if(!title || !description || !author){
        const error = createHttpError(400, "all fields are requireed");

        return next(error);
    }
    res.json({message: "book uploded"})

};

export default createBook;


