
import mongoose from "mongoose";
import { conf } from "./config";


const connectDb = async () => {

    try {
        
        mongoose.connection.on("connected", () => {
           console.log("connected to database")
        });
        await  mongoose.connect(conf.Databaseurl as string);
       

        mongoose.connection.on('error', (err) => {
            console.log("error in connecting to databse", err)
        })
    } catch (err) {
        console.error("failed to connect database");

        process.exit(1);
    }

};


export default connectDb;