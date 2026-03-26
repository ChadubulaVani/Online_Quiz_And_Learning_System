import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    questions: [
      {
        questionText: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: {
          type: Number, // index of correct option
          required: true,
          min: 0,
        },
        difficulty: {
          type: String,
          enum: ["Easy", "Medium", "Hard"],
          default: "Easy",
        },
        marks: { type: Number, default: 1 },
        negativeMarks: { type: Number, default: 0.25 },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

// Create Model
const Quiz = mongoose.model("Quiz", quizSchema);

// Export Model (default export)
export default Quiz;
