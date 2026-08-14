import express from "express";
import isAuth from "../middleWare/isAuth.middleWare.js";
import { getAuthUser } from "../controller/user.contoller.js";


const router = express.Router();

router.get("/getuser", isAuth, getAuthUser)
export default router;