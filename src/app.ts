
import express from "express"
import globalErrorHandler from './middleware/globalErrorhandler';
import createHttpError from "http-errors";
import userRouter from "./user/userRoutes";


const app = express();

app.use(express.json());


app.get("/", (req,res,next) => {
    const error = createHttpError(400, "somthing went wrong");
    throw error;
    res.json({message: "welcome to elib api"})

});


app.use("/api/users", userRouter);

//global error handler 
app.use(globalErrorHandler);


export default app;