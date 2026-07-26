import express from "express";
import auth from "../middleware/auth.js";
import {
  createLeave,
  getStudentLeave,
  getAdminPendingLeaves,
  getFacultyPendingLeaves,
  getWardenPendingLeaves,
  hodApprove,
  coordinatorApprove,
  wardenApprove,
  rejectLeave,
  getWardenApprovedLeaves,
  getActiveLeaves
} from "../controller/hostelLeaveController.js";

const router = express.Router();

// Student routes
router.post("/create", auth, createLeave);
router.post("/student", auth, getStudentLeave);

// Admin routes (HOD)
router.get("/admin", auth, getAdminPendingLeaves);
router.post("/hod-approve", auth, hodApprove);

// Faculty routes (Coordinator)
router.post("/faculty", auth, getFacultyPendingLeaves); // Needs department
router.post("/coordinator-approve", auth, coordinatorApprove);

// Warden routes (Final approval)
router.get("/warden", auth, getWardenPendingLeaves);
router.post("/warden-approve", auth, wardenApprove);
router.get("/warden/approved", auth, getWardenApprovedLeaves);
router.get("/active", auth, getActiveLeaves);

// Reject (can be called by any role)
router.post("/reject", auth, rejectLeave);

export default router;
