import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODBCONNECTIONSTRING;
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const URL = process.env.URL;

export default {
    MONGODB_URI,
    PORT,
    JWT_SECRET,
    URL

}