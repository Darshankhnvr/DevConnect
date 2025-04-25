import express from "express";
import {getAllPost,createPost,deletePost} from "../controllers/postController.js"
import {protect} from "../middlewares/authMiddleware.js"
import {uploadPostImage} from "../middlewares/uploadMiddleware.js"

const router = express.Router();

router.get('/',protect,getAllPost);
router.post('/create',protect,uploadPostImage.single("image"),createPost);
router.delete('/:id',protect,deletePost);
export default router;