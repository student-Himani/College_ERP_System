import dotenv from "dotenv";
import { validationResult } from "express-validator";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/generateTokens.js";

dotenv.config();

export const register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password, role, department } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "Email already registered" });

  const user = new User({ name, email, password, role, department });
  await user.save();

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({ accessToken, user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
});

export const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const valid = await user.comparePassword(password);
  if (!valid) return res.status(400).json({ message: "Invalid credentials" });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken, user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
});

export const logout = asyncHandler(async (req, res) => {
  // To logout, increment tokenVersion to invalidate existing refresh tokens
  const userId = req.user && req.user._id;
  if (userId) {
    await User.findByIdAndUpdate(userId, { $inc: { tokenVersion: 1 } });
  }
  res.clearCookie("refreshToken", { httpOnly: true, sameSite: "Strict", secure: process.env.NODE_ENV === "production" });
  res.json({ message: "Logged out" });
});

export const changePassword = asyncHandler(async (req, res) => {
  const userId = req.user && req.user._id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(userId).select("+password");
  if (!user) return res.status(404).json({ message: "User not found" });

  const valid = await user.comparePassword(currentPassword);
  if (!valid) return res.status(400).json({ message: "Current password incorrect" });

  user.password = newPassword; // will hash in pre-save
  user.tokenVersion += 1; // revoke previous refresh tokens
  await user.save();

  // Issue new tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken, message: "Password changed" });
});

export const me = asyncHandler(async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  res.json({ user: req.user });
});

export const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies && req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });
  let payload;
  try {
    payload = verifyRefreshToken(token);
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }
  const user = await User.findById(payload.sub).select("+password tokenVersion");
  if (!user) return res.status(401).json({ message: "User no longer exists" });
  if (payload.tokenVersion !== user.tokenVersion) return res.status(401).json({ message: "Token revoked" });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({ accessToken, user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
});
