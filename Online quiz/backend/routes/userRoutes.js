import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  getAllUsers,
  deleteUser
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Profile
router.get("/profile", authMiddleware, getProfile);

// Admin-only test
router.get("/admin-only", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: "Welcome Admin ✅" });
});

// Manage users
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);

export default router;
