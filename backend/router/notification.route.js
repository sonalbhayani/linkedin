import express from "express";
import { createNotification, getNotification, updateNotification, updateAllNotification, deleteNotification, deleteAllNotification } from "../controller/notification.controller.js";
const router = express.Router();
import isAuth from "../middleWare/isAuth.middleWare.js";


router.get("/get", isAuth, getNotification);
router.put("/read", isAuth, updateNotification);
router.put("/readall", isAuth, updateAllNotification);
router.delete("/delete", isAuth, deleteNotification);
router.delete("/deleteall", isAuth, deleteAllNotification);
export default router;