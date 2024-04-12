import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoDB_ConSting = process.env.MONGODBCONNECTIONSTRING;
const connectDB = async() => {
    try {
        const connection = await mongoose.connect(mongoDB_ConSting);
        console.log("Connected to Mongo DB");
    } catch (error) {
        console.log("Error while connecting Database");
    }
}

export default connectDB;