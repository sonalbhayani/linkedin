import express from "express";
import isAuth from "../middleWare/isAuth.middleWare.js";
import upload from "../middleWare/multer.js";
import { getAuthUser, updateProfile, getuserbyid, searchUser, getSuggestedUser } from "../controller/user.contoller.js";


const router = express.Router();

router.get("/getuser", isAuth, getAuthUser);
router.put("/updateProfile", isAuth, upload.fields([{ name: "profileImage", maxCount: 1 }, { name: "coverImage", maxCount: 1 }]), updateProfile)
router.get("/profile/:id", isAuth, getuserbyid)
router.get("/searchUser", isAuth, searchUser)
router.get("/suggesteduser", isAuth, getSuggestedUser)
export default router;