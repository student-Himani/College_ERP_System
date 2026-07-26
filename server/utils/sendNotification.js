import Notification from "../models/Notification.js";

const sendNotification = async (userId, role, title, message, type = "system") => {
  try {
    if (!userId || !role || !title || !message) {
      return null;
    }

    const notification = await Notification.create({
      userId,
      role,
      title,
      message,
      type,
    });

    return notification;
  } catch (error) {
    console.error("Notification creation failed:", error.message);
    return null;
  }
};

export default sendNotification;
