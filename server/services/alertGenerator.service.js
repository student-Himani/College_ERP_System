import AcademicAlert from "../models/academicAlert.js";
import Attendence from "../models/attendance.js";
import Marks from "../models/marks.js";
import Notification from "../models/Notification.js";

export const evaluateRisk = (attendance, marks) => {
  const att =
    typeof attendance === "number" && !Number.isNaN(attendance)
      ? attendance
      : null;
  const mrk = typeof marks === "number" && !Number.isNaN(marks) ? marks : null;

  if (att === null && mrk === null) return null;

  if ((att !== null && att < 60) || (mrk !== null && mrk < 30)) {
    return {
      type: "CRITICAL_RISK",
      severity: "CRITICAL",
      message: `Critical academic risk: attendance ${att ?? "N/A"}%, marks ${
        mrk ?? "N/A"
      }.`,
    };
  }

  if ((att !== null && att < 75) || (mrk !== null && mrk < 40)) {
    let type = "ATTENDANCE_LOW";
    if (mrk !== null && mrk < 40 && (att === null || att >= 75)) {
      type = "MARKS_LOW";
    }
    return {
      type,
      severity: "WARNING",
      message: `Academic warning: attendance ${att ?? "N/A"}%, marks ${
        mrk ?? "N/A"
      }.`,
    };
  }

  return null;
};

export const generateAlert = async (studentId, type, severity, message) => {
  if (!studentId || !type || !severity || !message) return;

  await AcademicAlert.create({
    studentId,
    type,
    severity,
    message,
    status: "UNREAD",
  });

  // Create general notification for the student
  await Notification.create({
    userId: studentId,
    role: "student",
    title: type === "CRITICAL_RISK" ? "Critical Academic Alert" : "Academic Warning",
    message: message,
    type: "attendance", // fits the context of attendance/marks
  });
};

const computeAttendancePercentage = async (studentId) => {
  const records = await Attendence.find({ student: studentId });
  if (!records || records.length === 0) return null;

  let totalLectures = 0;
  let totalAttended = 0;

  records.forEach((rec) => {
    totalLectures += rec.totalLecturesByFaculty || 0;
    totalAttended += rec.lectureAttended || 0;
  });

  if (totalLectures === 0) return null;
  return (totalAttended / totalLectures) * 100;
};

const computeMarksPercentage = async (studentId) => {
  const marksDocs = await Marks.find({ student: studentId }).populate("exam");
  if (!marksDocs || marksDocs.length === 0) return null;

  let totalScored = 0;
  let totalMax = 0;

  marksDocs.forEach((doc) => {
    const scored = typeof doc.marks === "number" ? doc.marks : 0;
    const max = doc.exam?.totalMarks || 0;
    totalScored += scored;
    totalMax += max;
  });

  if (totalMax === 0) return null;
  return (totalScored / totalMax) * 100;
};

export const checkStudentRisk = async (
  studentId,
  attendancePercent = null,
  marksPercent = null
) => {
  let att = attendancePercent;
  let mrk = marksPercent;

  if (att == null) {
    att = await computeAttendancePercentage(studentId);
  }
  if (mrk == null) {
    mrk = await computeMarksPercentage(studentId);
  }

  const risk = evaluateRisk(att, mrk);
  if (!risk) return;

  const { type, severity, message } = risk;
  await generateAlert(studentId, type, severity, message);
};

