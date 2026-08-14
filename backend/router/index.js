import express from "express";
import userRouter from "./user.route.js";

const router = express.Router();

router.use("/auth", userRouter);

export default router;