import express from "express";
import { getAlertsByStudent, getAllAlerts } from "../controller/academicAlert.controller.js";

const router = express.Router();

router.get("/alerts/:studentId", getAlertsByStudent);
router.get("/alerts", getAllAlerts);

export default router;

