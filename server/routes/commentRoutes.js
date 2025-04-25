import express from "express";
import { addComment, getComments, deleteComment } from "../controllers/commentController.js";

const router = express.Router();

router.post("/", addComment);                 // Add comment
router.get("/:postId", getComments);          // Get comments for a post
router.delete("/:commentId", deleteComment);  // Delete a comment

export default router;
