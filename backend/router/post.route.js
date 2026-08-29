import express from "express";
import { createPost, getPost, likePost, commentPost } from "../controller/post.controller.js";
import isAuth from "../middleWare/isAuth.middleWare.js";
import upload from "../middleWare/multer.js";
const router = express.Router();

router.post("/create-post", isAuth, upload.single("image"), createPost);
router.get("/getpost", isAuth, getPost);
router.get("/like/:id", isAuth, likePost);
router.post("/comment/:id", isAuth, commentPost);
export default router;