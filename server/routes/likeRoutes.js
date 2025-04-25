import express from "express";
import { toggleLike, getPostLikes } from "../controllers/likeController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:postId/toggle",protect, toggleLike);        
router.get("/:postId", getPostLikes);       
export default router;
