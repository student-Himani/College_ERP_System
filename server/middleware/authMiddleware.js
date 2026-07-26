import dotenv from "dotenv";
import { verifyAccessToken, verifyRefreshToken, generateAccessToken, generateRefreshToken } from "../utils/generateTokens.js";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import cookieParser from "cookie-parser";

dotenv.config();

export const attachUser = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const payload = verifyAccessToken(token);
      const user = await User.findById(payload.sub).select("-password");
      if (!user) return next();
      req.user = user;
    } catch (err) {
      // invalid or expired access token - do nothing here
    }
  }
  next();
});

export const requireAuth = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = verifyAccessToken(token);
    const user = await User.findById(payload.sub).select("-password");
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});

export const refreshTokenHandler = asyncHandler(async (req, res) => {
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
  if (payload.tokenVersion !== user.tokenVersion) {
    return res.status(401).json({ message: "Token revoked" });
  }
  // generate new tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  // set refresh token cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({ accessToken, user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
});
