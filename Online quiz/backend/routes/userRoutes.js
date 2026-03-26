import express from "express";
import { registerUser, loginUser, getProfile } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Profile (protected)
router.get("/profile", authMiddleware, getProfile);
router.get("/admin-only", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: "Welcome Admin ✅" });
});

export default router;
