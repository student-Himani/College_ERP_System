import AcademicAlert from "../models/academicAlert.js";

export const getAlertsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ message: "studentId is required" });
    }

    const alerts = await AcademicAlert.find({ studentId })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({ result: alerts });
  } catch (error) {
    return res.status(500).json({ backendError: error.message });
  }
};

export const getAllAlerts = async (req, res) => {
  try {
    const alerts = await AcademicAlert.find({})
      .populate("studentId", "name department year section")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({ result: alerts });
  } catch (error) {
    return res.status(500).json({ backendError: error.message });
  }
};

