import express from "express";
import { createPost } from "../controller/post.controller.js";
import isAuth from "../middleWare/isAuth.middleWare.js";
import upload from "../middleWare/multer.js";
const router = express.Router();

router.post("/create-post", isAuth, upload.single("image"), createPost);
export default router;