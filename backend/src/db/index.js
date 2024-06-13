import { DB_NAME } from "../constant.js";
import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("MongoDB Connected Sucessfully !!!\nDB Host:", connectionInstance.connection.host);
    }
    catch(error){
        console.log("MongoDB Connection Failed !!\n", error);
        process.exit(1);
    }
}

export default connectDB;