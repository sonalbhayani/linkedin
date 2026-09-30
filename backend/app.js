import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import router from "./router/index.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";


dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
    },
});
app.use(express.json());
app.use(cookieParser());

const userSckotMap = new Map();
io.on("connection", (socket) => {
    socket.on("register", (userId) => {
        if (!userId) return;
        userSckotMap.set(userId.toString(), socket.id);
        // console.log("user is registered", userId.toString(), socket.id);
    });
    socket.on("disconnect", () => {
        // console.log("user is disconnected", socket.id);
        for (const [key, value] of userSckotMap.entries()) {
            if (value === socket.id) {
                userSckotMap.delete(key);
                break;
            }
        }
    });
});

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
connectDB();
app.use("/api/v1", router);
export { server, io, userSckotMap }



