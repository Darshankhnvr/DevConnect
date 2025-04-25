// config/db.js
import mongoose from 'mongoose';

export const dbConnect = () => {
    console.log(process.env.MONGO_URI)
  mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connection success"))
  .catch((err) => console.log("MongoDB connection failed", err));
};
