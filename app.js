import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import jobRouter from "./Routers/jobs.router.js";
import userRouter from "./Routers/users.router.js";

const app = express();

// http://localhost:5173
// https://jobconnect-crm.netlify.app
app.use(cors({
    origin: 'https://jobconnect-crm.netlify.app',
    credentials: true,
    sameSite: 'none'
}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://jobconnect-crm.netlify.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json())
app.use(express.urlencoded({ limit: '10mb', extended: false }));
app.use(morgan('dev'));
app.use(cookieParser());

app.use("/api/jobs", jobRouter);
app.use("/api/users", userRouter);
export default app;

