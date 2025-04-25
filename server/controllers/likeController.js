import Like from "../models/Like.js";
import Post from "../models/Post.js";

export const toggleLike = async (req, res) => {
    try {
      const postId = req.params.postId;
      const userId = req.user._id;
  
      // Check if user is authenticated
      if (!userId) {
        return res.status(400).json({ message: "User not authenticated" });
      }
  
      // Check if post exists
      const post = await Post.findById(postId);
      console.log(post);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      // Check if user has already liked the post
      const existingLike = await Like.findOne({ user: userId, post: postId });
  
      if (existingLike) {
        // Unlike if already liked
        await existingLike.deleteOne();
        await Post.findByIdAndUpdate(postId, { $inc: { likesCount: -1 } });
  
        return res.json({ message: "Post unliked", liked: false });
      } else {
        // Like if not already liked
        const newLike = new Like({ user: userId, post: postId });
        await newLike.save();
        await Post.findByIdAndUpdate(postId, { $inc: { likesCount: 1 } });
  
        return res.status(201).json({ message: "Post liked", liked: true });
      }
    } catch (error) {
      console.error("Toggle Like Error:", error.message || error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  



export const getPostLikes = async (req, res) => {
  try {
    const { postId } = req.params;

    const likes = await Like.find({ post: postId }).populate("user", "name avatar");

    res.json({ likes });
  } catch (error) {
    console.error("Get Post Likes Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
