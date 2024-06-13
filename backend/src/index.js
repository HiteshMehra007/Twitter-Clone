import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
})

connectDB()
.then(()=> {
    const PORT = process.env.PORT || 8080;

    app.listen(PORT, (req, res) => {
        console.log(`Server listening at PORT ${PORT}.`);
    })
})
.catch((error) => {
    console.log("MongoDB Connection Failed !\n", error);
})