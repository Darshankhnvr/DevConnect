import express, { Router } from "express";
import upload from "../middlewares/upload.js"

import {protect} from "../middlewares/authMiddleware.js"
import { userProfile,updateUserProfile,changePassword,uploadProfilePic } from "../controllers/userController.js";

const router = express.Router();


router.get('/profile',protect,userProfile);
router.put('/profile',protect, updateUserProfile);
router.put('/change-password',protect,changePassword);
router.put('/upload-profile-pic',protect,upload.single("image"),updateUserProfile);

export default router;