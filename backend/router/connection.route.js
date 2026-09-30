import express from "express";
import {
    createConnection, acceptConnection, rejectConnection,
    getConnectionStatus, removeConnection, getConnectionRequest, getConnections
} from "../controller/connection.controller.js";
import isAuth from "../middleWare/isAuth.middleWare.js";
const router = express.Router();
router.post("/create", isAuth, createConnection);
router.put("/accept", isAuth, acceptConnection);
router.put("/reject", isAuth, rejectConnection);
router.post("/getConnectionStatus", isAuth, getConnectionStatus);
router.get("/getConnectionStatus", isAuth, getConnectionStatus);
router.delete("/remove", isAuth, removeConnection)
router.get("/request", isAuth, getConnectionRequest);
router.get("/", isAuth, getConnections);
export default router;