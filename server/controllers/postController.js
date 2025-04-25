import Post from "../models/Post.js";

export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name username profilePic") // corrected "User" → "user"
      .populate("comments.user", "name username profilePic")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.error("Get All Posts Error:", err);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

export const createPost = async (req, res) => {
  try {
    const { description } = req.body;

    // Check if request has content or image
    if (!description && !req.file) {
      return res.status(400).json({ message: "Post cannot be empty" });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const newPost = new Post({
      user: req.user._id,
      description,
      image: req.file ? req.file.filename : null,
    });

    await newPost.save();

    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deletePost = async (req, res) => {
    try {
      const postId = req.params.id;
  

      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  

      if (post.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Unauthorized to delete this post" });
      }
  
   
      const result = await Post.deleteOne({ _id: postId });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error("Delete Post Error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  