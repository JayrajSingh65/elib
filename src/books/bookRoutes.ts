import express from "express";
import createBook from "./bookController";
import multer from "multer";
import path from "node:path"
import authenticate from "../middleware/authorization";


const bookRouter = express.Router();

const upload = multer({
    dest: path.resolve(__dirname, "../../public/data/upload"),
    limits: {fileSize: 3e7}
});

bookRouter.post("/", authenticate, upload.fields([
    {name: "coverImage", maxCount: 1},
    {name: "filelink", maxCount: 1}
]), createBook);




export default bookRouter;