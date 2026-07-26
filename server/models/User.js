import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // password is optional when using Clerk; keep for legacy users
    password: { type: String, required: false, select: false },
    // store Clerk id to link Clerk identity
    clerkId: { type: String, index: true, sparse: true },
    role: { type: String, enum: ["ADMIN", "FACULTY", "STUDENT"], default: "STUDENT" },
    department: { type: String },
    tokenVersion: { type: Number, default: 0 },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
