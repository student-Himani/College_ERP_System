import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "faculty", "warden", "admin"],
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ["leave", "attendance", "system", "timetable"],
    default: "system",
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("notification", notificationSchema);
