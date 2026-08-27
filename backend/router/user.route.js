import express from "express";
import isAuth from "../middleWare/isAuth.middleWare.js";
import upload from "../middleWare/multer.js";
import { getAuthUser, updateProfile } from "../controller/user.contoller.js";


const router = express.Router();

router.get("/getuser", isAuth, getAuthUser);
router.put("/updateProfile", isAuth, upload.fields([{ name: "profileImage", maxCount: 1 }, { name: "coverImage", maxCount: 1 }]), updateProfile)
export default router;