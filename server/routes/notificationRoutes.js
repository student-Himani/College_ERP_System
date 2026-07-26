import express from "express";
import auth from "../middleware/auth.js";
import {
  deleteNotification,
  getUserNotifications,
  markAllAsRead,
  markAsRead,
  sendGlobalNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/user", auth, getUserNotifications);
router.put("/read/:id", auth, markAsRead);
router.put("/read-all", auth, markAllAsRead);
router.delete("/delete/:id", auth, deleteNotification);
router.post("/global", auth, sendGlobalNotification);

export default router;
