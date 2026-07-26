import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
import { addDummyAdmin } from "./controller/adminController.js";
import wardenRoutes from "./routes/wardenRoutes.js";
import hostelLeaveRoutes from "./routes/hostelLeaveRoutes.js";
import hostelAttendanceRoutes from "./routes/hostelAttendanceRoutes.js";
import academicAlertRoutes from "./routes/academicAlertRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();

app.use("/api/warden", wardenRoutes);
app.use("/api/hostel/leave", hostelLeaveRoutes);
app.use("/api/attendance", hostelAttendanceRoutes);
app.use("/api", academicAlertRoutes);
app.use("/api/notification", notificationRoutes);

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    addDummyAdmin();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error.message);
    console.error("Attempted URL:", process.env.CONNECTION_URL);
    console.error("\n✅ SOLUTION:");
    console.error("1. If using Atlas, allow your IP under Network Access (0.0.0.0/0 for dev)");
    console.error("2. Ensure credentials in .env are correct");
    console.error("3. For local MongoDB ensure it's running (mongod)");
    console.error("4. Restart the server after changes\n");
    process.exit(1);
  });
