import express from "express";
import auth from "../middleware/auth.js";
import {
  getAdminAttendance,
  getStudentAttendance,
  markAttendance,
} from "../controller/hostelAttendanceController.js";

const router = express.Router();

router.post("/mark", auth, markAttendance);
router.get("/student", auth, getStudentAttendance);
router.get("/admin", auth, getAdminAttendance);

export default router;
