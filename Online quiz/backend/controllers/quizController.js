import mongoose from "mongoose";
import Quiz from "../models/Quiz.js";
import QuizAttempt from "../models/quizAttempt.js";

// Create quiz
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
      questions
    });

    res.status(201).json({ message: "Quiz created successfully", quiz });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ message: "Error creating quiz" });
  }
};

// Get quiz by courseId
export const getQuizByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { level, limit = 10 } = req.query;

    const courseObjectId = new mongoose.Types.ObjectId(courseId);
    const quiz = await Quiz.findOne({ courseId: courseObjectId });

    if (!quiz) {
      return res.status(404).json({ message: "No quiz found" });
    }

    let questions = [...quiz.questions];

    if (level) {
      questions = questions.filter((q) => q.difficulty === level);
    }

    const numericLimit = Number(limit);
    questions = questions.sort(() => 0.5 - Math.random()).slice(0, numericLimit);

    res.json({
      _id: quiz._id,
      courseId: quiz.courseId,
      questions
    });
  } catch (err) {
    console.error("Error fetching quiz:", err);
    res.status(500).json({ message: "Error fetching quiz" });
  }
};

// Submit quiz
export const submitQuiz = async (req, res) => {
  try {
    const { userId, courseId, answers, timeTaken, level } = req.body;

    if (!userId || !courseId || !answers) {
      return res
        .status(400)
        .json({ message: "userId, courseId, and answers are required" });
    }

    const courseObjectId = new mongoose.Types.ObjectId(courseId);
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const quiz = await Quiz.findOne({ courseId: courseObjectId });
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    let questions = [...quiz.questions];

    if (level) {
      questions = questions.filter((q) => q.difficulty === level);
    }

    if (!Array.isArray(answers) || answers.length !== questions.length) {
      return res.status(400).json({
        message: "Answers must match the number of displayed quiz questions"
      });
    }

    let score = 0;
    const review = [];

    questions.forEach((q, index) => {
      const userAnswer = answers[index];

      if (userAnswer === q.correctAnswer) {
        score += q.marks;
        review.push({
          ...q.toObject(),
          yourAnswer: userAnswer,
          isCorrect: true
        });
      } else {
        if (userAnswer !== null && userAnswer !== undefined) {
          score -= q.negativeMarks;
        }

        review.push({
          ...q.toObject(),
          yourAnswer: userAnswer,
          isCorrect: false
        });
      }
    });

    const attempt = await QuizAttempt.create({
      userId: userObjectId,
      courseId: courseObjectId,
      answers,
      score,
      total: questions.length,
      timeTaken: timeTaken || null
    });

    res.json({
      message: "Quiz submitted successfully",
      score,
      total: questions.length,
      review,
      attemptId: attempt._id
    });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).json({ message: "Error submitting quiz" });
  }
};

// Get attempts/history
export const getAttemptsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

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

// Get leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    const leaderboard = await QuizAttempt.find({ courseId: courseObjectId })
      .populate("userId", "name email")
      .sort({ score: -1, timeTaken: 1 })
      .limit(10)
      .lean();

    res.json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Error fetching leaderboard" });
  }
};
