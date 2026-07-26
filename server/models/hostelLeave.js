import mongoose from "mongoose";

const hostelLeaveSchema = mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: [
      "pending",
      "hod_approved",
      "coordinator_approved",
      "warden_approved",
      "rejected",
    ],
    default: "pending",
  },
  hodApproved: {
    type: Boolean,
    default: false,
  },
  coordinatorApproved: {
    type: Boolean,
    default: false,
  },
  wardenApproved: {
    type: Boolean,
    default: false,
  },
  approvedByHOD: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
  },
  approvedByCoordinator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "faculty",
  },
  approvedByWarden: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "warden",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("hostelleave", hostelLeaveSchema);
