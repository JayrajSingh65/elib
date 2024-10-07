import connectDb from "./config/db";
import app from "./src/app";

const startServer = async () => {
    await connectDb();
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log("Server started")
    })

};

startServer();