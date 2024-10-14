
import express from "express"
import globalErrorHandler from './middleware/globalErrorhandler';
import createHttpError from "http-errors";
import userRouter from "./user/userRoutes";
import bookRouter from "./books/bookRoutes";


const app = express();

app.use(express.json());


app.get("/", (req,res,next) => {
    const error = createHttpError(400, "somthing went wrong");
    throw error;
    res.json({message: "welcome to elib api"})

});


app.use("/api/users", userRouter);
app.use("/api/books", bookRouter)

//global error handler 
app.use(globalErrorHandler);


export default app;