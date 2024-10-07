
import express from "express"
import globalErrorHandler from './middleware/globalErrorhandler';
import createHttpError from "http-errors";


const app = express();


app.get("/", (req,res,next) => {
    const error = createHttpError(400, "somthing went wrong");
    throw error;
    res.json({message: "welcome to elib api"})

});

//global error handler 
app.use(globalErrorHandler);


export default app;