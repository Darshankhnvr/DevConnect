import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
import { dbConnect } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import commentRoutes from "./routes/commentRoutes.js"
import likeRoutes from "./routes/likeRoutes.js";






const app = express();
const PORT = process.env.PORT | 3000


app.use(express.json());
app.use(cors());
app.use('/uploads/posts', express.static('uploads/posts'));

//connection to mongoDb
dbConnect();


app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/posts',postRoutes);
app.use("/api/comments", commentRoutes);
app.use('/api/like',likeRoutes);

app.use("/uploads", express.static("uploads")); // Make uploads folder accessible


app.listen(PORT,()=>{
    console.log(`your server is running on port ${PORT}`);
})



