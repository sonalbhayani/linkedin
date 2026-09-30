import express from "express";
import userRouter from "./user.route.js";
import authRouter from "./auth.route.js";
import postRouter from "./post.route.js";
import connectionRouter from "./connection.route.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/connection", connectionRouter);

export default router;