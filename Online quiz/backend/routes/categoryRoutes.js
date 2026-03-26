import express from "express";
import { addCategory, getCategories, getCategoryById } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", addCategory);       // Add new category
router.get("/", getCategories);      // Get all categories
router.get("/:id", getCategoryById); // Get single category

export default router;
