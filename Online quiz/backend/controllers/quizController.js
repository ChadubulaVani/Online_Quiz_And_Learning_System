import mongoose from "mongoose";
import Quiz from "../models/Quiz.js";
import QuizAttempt from "../models/quizAttempt.js";

// -----------------------------
// Create quiz for a course
// -----------------------------
export const createQuiz = async (req, res) => {
  try {
    const { courseId, questions } = req.body;

    if (!courseId || !Array.isArray(questions) || questions.length === 0) {
      return res
        .status(400)
        .json({ message: "courseId and at least one question are required" });
    }

    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    const quiz = await Quiz.create({
      courseId: courseObjectId,
      questions,
    });

    res.status(201).json({ message: "Quiz created successfully", quiz });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ message: "Error creating quiz" });
  }
};

// -----------------------------
// Get quiz by courseId
// Supports: difficulty level + random questions
// -----------------------------
export const getQuizByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { level, limit = 10 } = req.query;

    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    const quiz = await Quiz.findOne({ courseId: courseObjectId });

    if (!quiz) return res.status(404).json({ message: "No quiz found" });

    let questions = quiz.questions;

    // Filter by difficulty level
    if (level) {
      questions = questions.filter(q => q.difficulty === level);
    }

    // 🔀 Shuffle & limit questions
    questions = questions.sort(() => 0.5 - Math.random()).slice(0, limit);

    res.json({ ...quiz.toObject(), questions });
  } catch (err) {
    console.error("Error fetching quiz:", err);
    res.status(500).json({ message: "Error fetching quiz" });
  }
};

// -----------------------------
// Submit quiz
// Supports: negative marking + review
// -----------------------------
export const submitQuiz = async (req, res) => {
  try {
    const { userId, courseId, answers, timeTaken } = req.body;

    if (!userId || !courseId || !answers) {
      return res
        .status(400)
        .json({ message: "userId, courseId, and answers are required" });
    }

    const courseObjectId = new mongoose.Types.ObjectId(courseId);
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const quiz = await Quiz.findOne({ courseId: courseObjectId });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    if (!Array.isArray(answers) || answers.length !== quiz.questions.length) {
      return res.status(400).json({
        message: "Answers must match the number of quiz questions",
      });
    }

    // Calculate score + build review array
    let score = 0;
    const review = [];

    quiz.questions.forEach((q, index) => {
      const userAnswer = answers[index];

      if (userAnswer === q.correctAnswer) {
        score += q.marks;
        review.push({ ...q.toObject(), yourAnswer: userAnswer, isCorrect: true });
      } else {
        if (userAnswer !== null && userAnswer !== undefined) {
          score -= q.negativeMarks; // negative marking
        }
        review.push({
          ...q.toObject(),
          yourAnswer: userAnswer,
          isCorrect: false,
        });
      }
    });

    const attempt = await QuizAttempt.create({
      userId: userObjectId,
      courseId: courseObjectId,
      answers,
      score,
      total: quiz.questions.length,
      timeTaken: timeTaken || null,
    });

    res.json({
      message: "Quiz submitted successfully",
      score,
      total: quiz.questions.length,
      review,          // for answer review on frontend
      attemptId: attempt._id,
    });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).json({ message: "Error submitting quiz" });
  }
};

// -----------------------------
// Get quiz attempts/history for a user
// -----------------------------
export const getAttemptsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId)
      return res.status(400).json({ message: "User ID is required" });

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const attempts = await QuizAttempt.find({ userId: userObjectId })
      .populate("courseId", "title")
      .sort({ createdAt: -1 })
      .lean();

    res.json(attempts);
  } catch (error) {
    console.error("Error fetching attempts:", error);
    res.status(500).json({ message: "Error fetching attempts" });
  }
};

// -----------------------------
// Get leaderboard for a course
// -----------------------------
export const getLeaderboard = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!courseId)
      return res.status(400).json({ message: "Course ID is required" });

    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    const leaderboard = await QuizAttempt.find({ courseId: courseObjectId })
      .populate("userId", "name email")
      .sort({ score: -1, timeTaken: 1 }) // higher score first, then faster
      .limit(10)
      .lean();

    res.json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Error fetching leaderboard" });
  }
};
