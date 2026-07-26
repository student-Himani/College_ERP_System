import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const ACCESS_EXPIRY = process.env.JWT_ACCESS_EXPIRY || "15m";
const REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRY || "7d";

export function generateAccessToken(user) {
  return jwt.sign(
    { sub: user._id, role: user.role },
    ACCESS_SECRET,
    { expiresIn: ACCESS_EXPIRY }
  );
}

export function generateRefreshToken(user) {
  return jwt.sign(
    { sub: user._id, tokenVersion: user.tokenVersion },
    REFRESH_SECRET,
    { expiresIn: REFRESH_EXPIRY }
  );
}

export function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET);
}
