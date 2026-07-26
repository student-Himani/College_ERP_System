import express from "express";
import { body } from "express-validator";
import { register, login, logout, refreshToken, changePassword, me } from "../controllers/authController.js";
import { requireAuth, attachUser } from "../middleware/authMiddleware.js";
import { loginLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// register
router.post(
  "/register",
  [
    body("name").isLength({ min: 2 }),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("role").isIn(["ADMIN", "FACULTY", "STUDENT"]).optional(),
  ],
  register
);

// login (rate limited)
router.post(
  "/login",
  loginLimiter,
  [body("email").isEmail(), body("password").exists()],
  login
);

// refresh
router.post("/refresh", refreshToken);

// logout
router.post("/logout", attachUser, requireAuth, logout);

// change password
router.post(
  "/change-password",
  attachUser,
  requireAuth,
  [body("currentPassword").exists(), body("newPassword").isLength({ min: 6 })],
  changePassword
);

// me
router.get("/me", attachUser, requireAuth, me);

export default router;
