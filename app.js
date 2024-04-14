import express from "express";
import cors from "cors";
import router from "./Routers/tickets.router.js"

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}));


app.use("/api", router);
export default app;

