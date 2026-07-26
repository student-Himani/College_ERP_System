import Warden from "../models/warden.js";
import Attendance from "../models/attendance.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const wardenLogin = async (req, res) => {
  const { username, password } = req.body;
  const errors = { usernameError: String, passwordError: String };
  try {
    const existingWarden = await Warden.findOne({ username });
    if (!existingWarden) {
      errors.usernameError = "Warden doesn't exist.";
      return res.status(404).json(errors);
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingWarden.password
    );
    if (!isPasswordCorrect) {
      errors.passwordError = "Invalid Credentials";
      return res.status(404).json(errors);
    }

    const token = jwt.sign(
      {
        email: existingWarden.email,
        id: existingWarden._id,
      },
      "sEcReT",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingWarden, token: token });
  } catch (error) {
    console.log(error);
  }
};

export const updatedPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, email } = req.body;
    const errors = { mismatchError: String };
    if (newPassword !== confirmPassword) {
      errors.mismatchError =
        "Your password and confirmation password do not match";
      return res.status(400).json(errors);
    }

    const warden = await Warden.findOne({ email });
    let hashedPassword;
    hashedPassword = await bcrypt.hash(newPassword, 10);
    warden.password = hashedPassword;
    await warden.save();
    if (warden.passwordUpdated === false) {
      warden.passwordUpdated = true;
      await warden.save();
    }

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      response: warden,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const updateWarden = async (req, res) => {
  try {
    const { name, dob, contactNumber, avatar, email } = req.body;
    const updatedWarden = await Warden.findOne({ email });
    if (name) {
      updatedWarden.name = name;
      await updatedWarden.save();
    }
    if (dob) {
      updatedWarden.dob = dob;
      await updatedWarden.save();
    }
    if (contactNumber) {
      updatedWarden.contactNumber = contactNumber;
      await updatedWarden.save();
    }
    if (avatar) {
      updatedWarden.avatar = avatar;
      await updatedWarden.save();
    }
    res.status(200).json(updatedWarden);
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const getWardenAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find().populate("student", "name department year section");
    res.status(200).json({ result: attendance });
  } catch (error) {
    res.status(500).json({ backendError: error.message });
  }
};
