import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // linked to Category
  image: {
    type: String,
    default: "https://via.placeholder.com/150"
  },
  contents: [String],   // course topics
  videos: [
    {
      title: String,
      url: String
    }
  ],
  quiz: [
    {
      question: String,
      options: [String],
      correctAnswer: String
    }
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Course", courseSchema);
