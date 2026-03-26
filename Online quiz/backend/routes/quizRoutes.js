import express from "express";
import {
  getQuizByCourse,
  createQuiz,
  submitQuiz,
  getAttemptsByUser,
  getLeaderboard,
} from "../controllers/quizController.js";

const router = express.Router();

// -----------------------------
// Quiz Routes
// -----------------------------

// ✅ Get all quiz attempts of a user
router.get("/history/:userId", getAttemptsByUser);

// ✅ Get leaderboard for a course
router.get("/leaderboard/:courseId", getLeaderboard);

// ✅ Get quiz by course ID
router.get("/:courseId", getQuizByCourse);

// ✅ Create quiz for a course
router.post("/", createQuiz);

// ✅ Submit quiz answers
router.post("/submit", submitQuiz);

export default router;
