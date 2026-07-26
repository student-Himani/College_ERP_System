import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Student from "./models/student.js";

const run = async () => {
  await mongoose.connect("mongodb://localhost:27017/collegeERP");

  const plainPassword = "25-06-2003";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await Student.updateOne(
    { username: "STU202602000" },
    { $set: { password: hashedPassword, passwordUpdated: true } }
  );

  console.log("Password updated!");
  mongoose.connection.close();
};

run();