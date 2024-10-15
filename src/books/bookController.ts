
import express, { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import fs from "node:fs"
import path from "node:path";
import { json } from "node:stream/consumers";
import cloudinary from "../../config/cloudinary";
import bookModel from "./bookModel";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    const {title, description, author, gener} = req.body;

    console.log("files", req.files);
    const files = req.files as {[fieldname: string]: Express.Multer.File[]}
    const coverImageMinetype =files.coverImage[0].mimetype.split('/').at(-1);
    const fileName = files.coverImage[0].filename;

    const filePath = path.resolve(__dirname, "../../public/data/upload", fileName)
  
    try {
        
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            filename_override: fileName,
            folder: "book-cover",
            format: coverImageMinetype,
    
    
        });
    
        const bookfileName = files.filelink[0].filename;
    
        const bookFilePath = path.resolve(__dirname, "../../public/data/upload", bookfileName);
    
        const bookFileUploadResult = await cloudinary.uploader.upload(bookFilePath,{
            resource_type: 'raw',
            filename_override: "bookfileName",
            folder: "book-pdfs",
            format: "pdf"
        })
        console.log("uploadresult", uploadResult);

        const newBook = await bookModel.create({
            title,
            gener,
            author: "6703b2bbef591872a2405694",
            coverImage: uploadResult.secure_url,
            filelink: bookFileUploadResult.secure_url

        });

        //delete file from server
        await fs.promises.unlink(filePath);
        
        await fs.promises.unlink(bookFilePath);


        res.status(201).json({id: newBook._id})
    
    } catch (error) {
        return next(createHttpError(500, "Error while uploading files"))
    }
};
export default createBook;
