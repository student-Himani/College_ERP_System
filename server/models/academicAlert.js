import mongoose from "mongoose";

const academicAlertSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
      required: true,
    },
    type: {
      type: String,
      enum: ["ATTENDANCE_LOW", "MARKS_LOW", "CRITICAL_RISK"],
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    severity: {
      type: String,
      enum: ["INFO", "WARNING", "CRITICAL"],
      required: true,
    },
    status: {
      type: String,
      enum: ["UNREAD", "READ"],
      default: "UNREAD",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "academic_alerts",
  }
);

export default mongoose.model("AcademicAlert", academicAlertSchema);

