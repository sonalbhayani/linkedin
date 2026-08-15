import express from "express";
import { register, login, logout } from "../controller/auth.contoller.js";
import validateRequest from "../middleWare/validateRequest.js";
import userValidation from "../validation/userValidation.js";
import loginValidation from "../validation/loginValidation.js";

const router = express.Router();

router.post("/signUp", validateRequest(userValidation), register);
router.post("/signIn", validateRequest(loginValidation), login);
router.get("/signOut", logout);

export default router;