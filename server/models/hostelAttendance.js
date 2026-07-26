import mongoose from "mongoose";

const hostelAttendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["present", "absent"],
      default: "present",
    },
    markedAutomatically: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

hostelAttendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

export default mongoose.model("hostelattendance", hostelAttendanceSchema);
