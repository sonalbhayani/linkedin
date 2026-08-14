import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import router from "./router/index.js";
import cors from "cors"


dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
connectDB();
app.use("/api/v1", router);
export default app;



