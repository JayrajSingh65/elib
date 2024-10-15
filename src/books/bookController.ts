
import express, { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import path from "node:path";
import { json } from "node:stream/consumers";
import cloudinary from "../../config/cloudinary";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    const {title, description, author} = req.body;

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
        console.log("uploadresult", uploadResult)
        res.json({message: "book uploded"})
    
    } catch (error) {
        return next(createHttpError(500, "Error while uploading files"))
    }
};
export default createBook;
