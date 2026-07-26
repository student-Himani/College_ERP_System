import express from "express";
import auth from "../middleware/auth.js";
import { wardenLogin, updatedPassword, updateWarden, getWardenAttendance } from "../controller/wardenController.js";

const router = express.Router();

router.post("/login", wardenLogin);
router.post("/updatepassword", auth, updatedPassword);
router.post("/updateprofile", auth, updateWarden);
router.get("/attendance", auth, getWardenAttendance);

export default router;
