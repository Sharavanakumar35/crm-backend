import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./Database/config.js";
import router from "./Routers/tickets.router.js"

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}));

connectDB();

app.use("/api", router);

app.listen(process.env.PORT, () => {
    console.log(`App is running on the port = ${process.env.PORT}`);
})