import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },  // e.g., Technology Hub
  description: String,
  image: {
    type: String,
    default: "https://via.placeholder.com/300x200"
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Category", categorySchema);
