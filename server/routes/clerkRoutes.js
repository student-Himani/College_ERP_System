import express from "express";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();

// NOTE: This endpoint accepts clerkId and email from the frontend after Clerk sign-in.
// It DOES NOT call the Clerk server SDK so the server does not require a Clerk API key.
// Security note: For production, prefer verifying the Clerk session server-side using
// ClerkExpressRequireAuth and clerkClient when you provide the Clerk API key.
router.post(
  "/sync",
  asyncHandler(async (req, res) => {
    const { clerkId, email, role = "STUDENT", name } = req.body;
    if (!clerkId || !email) return res.status(400).json({ message: "clerkId and email required" });

    let user = await User.findOne({ $or: [{ clerkId }, { email }] });
    if (!user) {
      user = new User({ name: name || email.split("@")[0], email, clerkId, role });
      await user.save();
      return res.status(201).json({ user });
    }

    // attach clerkId if missing
    let changed = false;
    if (!user.clerkId) {
      user.clerkId = clerkId;
      changed = true;
    }
    // only set role if user has no role
    if (!user.role) {
      user.role = role;
      changed = true;
    }
    if (changed) await user.save();

    res.json({ user });
  })
);

export default router;
