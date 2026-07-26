import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import clerkRoutes from "./routes/clerkRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import academicAlertRoutes from "./routes/academicAlertRoutes.js";
import { requireAuth } from "./middleware/authMiddleware.js";
import { authorizeRoles } from "./middleware/roleMiddleware.js";
import auth from "./middleware/auth.js";
import { deleteNotice } from "./controller/adminController.js";

const app = express();

app.use(helmet());
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many login attempts. Try again later." },
});

// mount routes
app.use("/api/auth", authRoutes);
app.use("/api/clerk", clerkRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/alert", academicAlertRoutes);

app.delete("/api/notice/:id", auth, deleteNotice);

// sample protected routes
app.get("/api/protected", requireAuth, (req, res) => {
  res.json({ message: "This is a protected endpoint", user: req.user });
});

app.get("/api/admin-only", requireAuth, authorizeRoles("ADMIN"), (req, res) => {
  res.json({ message: "Admin only area" });
});

// centralized error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

export default app;
