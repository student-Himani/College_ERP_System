import Notification from "../models/Notification.js";
import Admin from "../models/admin.js";
import Faculty from "../models/faculty.js";
import Student from "../models/student.js";
import Warden from "../models/warden.js";
import sendNotification from "../utils/sendNotification.js";

const detectUserRole = async (userId) => {
  if (await Student.exists({ _id: userId })) return "student";
  if (await Faculty.exists({ _id: userId })) return "faculty";
  if (await Warden.exists({ _id: userId })) return "warden";
  if (await Admin.exists({ _id: userId })) return "admin";
  return null;
};

export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user?.id || req.userId;
    if (!userId) return res.status(401).json({ message: "Unauthenticated" });

    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json({ result: notifications });
  } catch (error) {
    return res.status(500).json({ backendError: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const userId = req.user?.id || req.userId;
    const { id } = req.params;

    const notification = await Notification.findOneAndUpdate(
      { _id: id, userId },
      { isRead: true },
      { new: true }
    );

    if (!notification) return res.status(404).json({ message: "Notification not found" });
    return res.status(200).json({ success: true, result: notification });
  } catch (error) {
    return res.status(500).json({ backendError: error.message });
  }
};

export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user?.id || req.userId;
    await Notification.updateMany({ userId, isRead: false }, { isRead: true });
    return res.status(200).json({ success: true, message: "All notifications marked as read" });
  } catch (error) {
    return res.status(500).json({ backendError: error.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const userId = req.user?.id || req.userId;
    const { id } = req.params;

    const deleted = await Notification.findOneAndDelete({ _id: id, userId });
    if (!deleted) return res.status(404).json({ message: "Notification not found" });

    return res.status(200).json({ success: true, message: "Notification deleted" });
  } catch (error) {
    return res.status(500).json({ backendError: error.message });
  }
};

export const sendGlobalNotification = async (req, res) => {
  try {
    const userId = req.user?.id || req.userId;
    const role = await detectUserRole(userId);
    if (role !== "admin") return res.status(403).json({ message: "Only admin can send global notifications" });

    const { title, message, type = "system", targetRole } = req.body;
    if (!title || !message) return res.status(400).json({ message: "title and message are required" });

    const roleMap = {
      student: Student,
      faculty: Faculty,
      warden: Warden,
      admin: Admin,
    };

    const targetRoles = targetRole && roleMap[targetRole] ? [targetRole] : Object.keys(roleMap);
    for (const selectedRole of targetRoles) {
      const users = await roleMap[selectedRole].find({}, "_id");
      await Promise.all(
        users.map((person) =>
          sendNotification(person._id, selectedRole, title, message, type)
        )
      );
    }

    return res.status(200).json({ success: true, message: "Global notification sent" });
  } catch (error) {
    return res.status(500).json({ backendError: error.message });
  }
};
