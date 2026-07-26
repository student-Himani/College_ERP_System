import HostelAttendance from "../models/hostelAttendance.js";
import Student from "../models/student.js";
import sendNotification from "../utils/sendNotification.js";
import { sendAttendanceEmail } from "../utils/emailService.js";

const CAMPUS_LATITUDE = 19.110243;
const CAMPUS_LONGITUDE = 77.289972;
const ALLOWED_RADIUS_METERS = 50000; // Increased to 50km for testing/calibration

const toRadians = (value) => (value * Math.PI) / 180;

const getDistance = (lat1, lon1, lat2, lon2) => {
  const earthRadiusKm = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c * 1000;
};

const getTodayDate = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;

const getCurrentTime = (date) =>
  `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(
    2,
    "0"
  )}`;

const isAttendanceWindowOpen = (date) => {
  const totalMinutes = date.getHours() * 60 + date.getMinutes();
  const startMinutes = 14 * 60;
  const endMinutes = 22 * 60;
  // const startMinutes = 20 * 60;
  // const endMinutes = 0 * 60;

  // return totalMinutes >= startMinutes || totalMinutes <= endMinutes;
  return totalMinutes >= startMinutes && totalMinutes <= endMinutes;
};

export const markAttendance = async (req, res) => {
  try {
    const studentId = req.user?.id || req.userId;
    const { latitude, longitude } = req.body;

    if (!studentId) {
      return res.status(401).json({ message: "Unauthenticated" });
    }

    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return res.status(400).json({ message: "Latitude and longitude are required" });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const now = new Date();
    if (!isAttendanceWindowOpen(now)) {
      await Promise.all([
        sendNotification(
          studentId,
          "student",
          "Attendance Failed",
          "Outside allowed attendance time window",
          "attendance"
        ),
        sendAttendanceEmail(student.email, "failed"),
      ]);
      return res
        .status(400)
        .json({ message: "Attendance allowed only between 7 PM to 9 PM" });
    }

    const date = getTodayDate(now);
    const time = getCurrentTime(now);

    const existingAttendance = await HostelAttendance.findOne({ studentId, date });
    if (existingAttendance) {
      return res
        .status(400)
        .json({ message: "Attendance already marked for today" });
    }

    const distance = getDistance(latitude, longitude, CAMPUS_LATITUDE, CAMPUS_LONGITUDE);
    
    console.log("-----------------------------------------");
    console.log("Hostel Attendance Location Check:");
    console.log(`- Student Location: ${latitude}, ${longitude}`);
    console.log(`- Campus Center:    ${CAMPUS_LATITUDE}, ${CAMPUS_LONGITUDE}`);
    console.log(`- Calculated Distance: ${distance.toFixed(2)} meters`);
    console.log(`- Allowed Radius:      ${ALLOWED_RADIUS_METERS} meters`);
    console.log(`- Result: ${distance <= ALLOWED_RADIUS_METERS ? "INSIDE" : "OUTSIDE"}`);
    console.log("-----------------------------------------");

    if (distance > ALLOWED_RADIUS_METERS) {
      await Promise.all([
        sendNotification(
          studentId,
          "student",
          "Attendance Failed",
          "Outside campus or invalid location",
          "attendance"
        ),
        sendAttendanceEmail(student.email, "failed"),
      ]);
      return res.status(400).json({ message: "You are outside campus" });
    }

    const attendance = new HostelAttendance({
      studentId,
      date,
      time,
      latitude,
      longitude,
      status: "present",
    });

    await attendance.save();

    await Promise.all([
      sendNotification(
        studentId,
        "student",
        "Attendance Marked",
        "Marked successfully",
        "attendance"
      ),
      sendAttendanceEmail(student.email, "success"),
    ]);

    return res.status(200).json({
      success: true,
      message: "Attendance marked successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Attendance already marked for today" });
    }

    return res.status(500).json({ backendError: error.message });
  }
};

export const getStudentAttendance = async (req, res) => {
  try {
    const studentId = req.user?.id || req.userId;

    if (!studentId) {
      return res.status(401).json({ message: "Unauthenticated" });
    }

    const attendance = await HostelAttendance.find({ studentId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({ result: attendance });
  } catch (error) {
    return res.status(500).json({ backendError: error.message });
  }
};

export const getAdminAttendance = async (req, res) => {
  try {
    const attendance = await HostelAttendance.find()
      .populate("studentId", "name department year section")
      .sort({ createdAt: -1 });

    return res.status(200).json({ result: attendance });
  } catch (error) {
    return res.status(500).json({ backendError: error.message });
  }
};
