import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import jobRouter from "./Routers/jobs.router.js";
import userRouter from "./Routers/users.router.js";

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(cookieParser());

app.use("/api/jobs", jobRouter);
app.use("/api/users", userRouter);
export default app;

