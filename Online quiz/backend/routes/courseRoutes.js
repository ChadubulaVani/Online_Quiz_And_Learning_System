import express from "express";
import { 
  getAllCourses, 
  getCourseById, 
  getCoursesByCategory, 
  createCourse 
} from "../controllers/courseController.js";

const router = express.Router();

router.get("/", getAllCourses);                 // GET all courses
router.get("/:id", getCourseById);             // GET course by ID
router.get("/category/:id", getCoursesByCategory); // GET courses by category
router.post("/", createCourse);                // POST new course

export default router;
