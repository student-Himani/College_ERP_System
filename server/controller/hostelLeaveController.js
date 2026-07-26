import HostelLeave from "../models/hostelLeave.js";
import Student from "../models/student.js";
import Faculty from "../models/faculty.js";
import Admin from "../models/admin.js";
import Warden from "../models/warden.js";
import sendNotification from "../utils/sendNotification.js";
import { sendLeaveApprovalEmail } from "../utils/emailService.js";

// Student
export const createLeave = async (req, res) => {
  try {
    const { studentId, reason, fromDate, toDate } = req.body;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const newLeave = new HostelLeave({
      studentId,
      reason,
      fromDate,
      toDate,
    });
    await newLeave.save();

    // Notify role-based approvers without changing existing response flow.
    const [facultyUsers, adminUsers, wardenUsers] = await Promise.all([
      Faculty.find({ department: student.department }, "_id"),
      Admin.find({}, "_id"),
      Warden.find({}, "_id"),
    ]);

    await Promise.all([
      ...facultyUsers.map((faculty) =>
        sendNotification(
          faculty._id,
          "faculty",
          "New Leave Request",
          `A new leave request is submitted by ${student.name}`,
          "leave"
        )
      ),
      ...adminUsers.map((admin) =>
        sendNotification(
          admin._id,
          "admin",
          "Leave Request Submitted",
          `A leave request is waiting for approval from ${student.name}`,
          "leave"
        )
      ),
      ...wardenUsers.map((warden) =>
        sendNotification(
          warden._id,
          "warden",
          "New Leave Request Logged",
          `A leave request has been raised by ${student.name}`,
          "leave"
        )
      ),
    ]);

    res.status(200).json({ success: true, message: "Leave requested successfully", response: newLeave });
  } catch (error) {
    res.status(500).json({ backendError: error.message });
  }
};

export const getStudentLeave = async (req, res) => {
  try {
    const { studentId } = req.body;
    const leaves = await HostelLeave.find({ studentId }).sort({ createdAt: -1 });
    res.status(200).json({ result: leaves });
  } catch (error) {
    res.status(500).json({ backendError: error.message });
  }
};

// Admin (HOD)
export const getAdminPendingLeaves = async (req, res) => {
  try {
    const pendingLeaves = await HostelLeave.find({ status: "pending" }).populate("studentId", "name department year section");
    res.status(200).json({ result: pendingLeaves });
  } catch (error) {
    res.status(500).json({ backendError: error.message });
  }
};

export const hodApprove = async (req, res) => {
  try {
    const { leaveId, adminId } = req.body;
    const leave = await HostelLeave.findById(leaveId);
    if (!leave) return res.status(404).json({ message: "Leave not found" });
    if (leave.status !== "pending") return res.status(400).json({ message: "Leave is not in pending state" });

    leave.status = "hod_approved";
    leave.hodApproved = true;
    leave.approvedByHOD = adminId;
    await leave.save();

    const student = await Student.findById(leave.studentId);
    if (student) {
      await Promise.all([
        sendNotification(
          student._id,
          "student",
          "Leave Approved",
          "Your leave approved by faculty/HOD",
          "leave"
        ),
        sendLeaveApprovalEmail(student.email, student.name, "Approved"),
      ]);
    }

    res.status(200).json({ success: true, message: "Approved by HOD", response: leave });
  } catch (error) {
    res.status(500).json({ backendError: error.message });
  }
};

// Faculty (Coordinator)
export const getFacultyPendingLeaves = async (req, res) => {
  try {
    const { department } = req.body;
    // Faculty only sees leaves approved by HOD, and for their department
    // We populate studentId to filter by department
    const leaves = await HostelLeave.find({ status: "hod_approved" }).populate("studentId", "name department year section");
    const filteredLeaves = leaves.filter(leave => leave.studentId.department === department);
    res.status(200).json({ result: filteredLeaves });
  } catch (error) {
    res.status(500).json({ backendError: error.message });
  }
};

export const coordinatorApprove = async (req, res) => {
  try {
    const { leaveId, facultyId } = req.body;
    const leave = await HostelLeave.findById(leaveId);
    if (!leave) return res.status(404).json({ message: "Leave not found" });
    if (leave.status !== "hod_approved") return res.status(400).json({ message: "Leave is not in hod_approved state" });

    leave.status = "coordinator_approved";
    leave.coordinatorApproved = true;
    leave.approvedByCoordinator = facultyId;
    await leave.save();

    const student = await Student.findById(leave.studentId);
    if (student) {
      await Promise.all([
        sendNotification(
          student._id,
          "student",
          "Leave Approved",
          "Your leave approved by coordinator",
          "leave"
        ),
        sendLeaveApprovalEmail(student.email, student.name, "Approved"),
      ]);
    }

    res.status(200).json({ success: true, message: "Approved by Coordinator", response: leave });
  } catch (error) {
    res.status(500).json({ backendError: error.message });
  }
};

// Warden
export const getWardenPendingLeaves = async (req, res) => {
  try {
    const pendingLeaves = await HostelLeave.find({ status: "coordinator_approved" }).populate("studentId", "name department year section");
    res.status(200).json({ result: pendingLeaves });
  } catch (error) {
    res.status(500).json({ backendError: error.message });
  }
};

export const wardenApprove = async (req, res) => {
  try {
    const { leaveId, wardenId } = req.body;
    const leave = await HostelLeave.findById(leaveId);
    if (!leave) return res.status(404).json({ message: "Leave not found" });
    if (leave.status !== "coordinator_approved") return res.status(400).json({ message: "Leave is not in coordinator_approved state" });

    leave.status = "warden_approved";
    leave.wardenApproved = true;
    leave.approvedByWarden = wardenId;
    await leave.save();

    const student = await Student.findById(leave.studentId);
    if (student) {
      await Promise.all([
        sendNotification(
          student._id,
          "student",
          "Leave Approved",
          "Your leave approved by warden",
          "leave"
        ),
        sendLeaveApprovalEmail(student.email, student.name, "Approved"),
      ]);
    }

    res.status(200).json({ success: true, message: "Approved by Warden", response: leave });
  } catch (error) {
    res.status(500).json({ backendError: error.message });
  }
};

export const getWardenApprovedLeaves = async (req, res) => {
  try {
    const approvedLeaves = await HostelLeave.find({ 
      status: { $in: ["warden_approved", "approved"] } 
    }).populate("studentId", "name department year section avatar").sort({ createdAt: -1 });
    res.status(200).json({ result: approvedLeaves });
  } catch (error) {
    res.status(500).json({ backendError: error.message });
  }
};

export const getActiveLeaves = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of day

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Start of next day
    
    // Find leaves that are approved and taking place right now
    const activeLeaves = await HostelLeave.find({
      status: { $in: ["warden_approved", "approved"] },
      fromDate: { $lte: tomorrow },
      toDate: { $gte: today }
    }).populate("studentId", "name department year section avatar").sort({ fromDate: 1 });
    
    res.status(200).json({ result: activeLeaves });
  } catch (error) {
    res.status(500).json({ backendError: error.message });
  }
};

// Reject (Any role)
export const rejectLeave = async (req, res) => {
  try {
    const { leaveId } = req.body;
    const leave = await HostelLeave.findById(leaveId);
    if (!leave) return res.status(404).json({ message: "Leave not found" });

    leave.status = "rejected";
    await leave.save();

    const student = await Student.findById(leave.studentId);
    if (student) {
      await Promise.all([
        sendNotification(
          student._id,
          "student",
          "Leave Rejected",
          "Your leave request has been rejected",
          "leave"
        ),
        sendLeaveApprovalEmail(student.email, student.name, "Rejected"),
      ]);
    }

    res.status(200).json({ success: true, message: "Leave rejected", response: leave });
  } catch (error) {
    res.status(500).json({ backendError: error.message });
  }
};
