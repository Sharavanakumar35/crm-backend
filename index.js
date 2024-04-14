import mongoose from "mongoose";
import app from "./app.js";
import config from "./utils/config.js";

console.log("Connecting to MongoDB...");

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(config.PORT, () => {
            console.log(`App is running on the port = ${config.PORT}`);
        })
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB...", error);
    })