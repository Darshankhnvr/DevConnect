import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

// Add comment
export const addComment = async (req, res) => {
  try {
    const { postId, text } = req.body;

    if (!text || !postId) {
      return res.status(400).json({ message: "Text and postId are required" });
    }

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = new Comment({
      post: postId,
      user: req.user._id,
      text,
    });

    await comment.save();

    res.status(201).json({ message: "Comment added", comment });
  } catch (err) {
    console.error("Add Comment Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all comments for a post
export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });

    res.json({ comments });
  } catch (err) {
    console.error("Get Comments Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a comment (only by owner)
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (String(comment.user) !== String(req.user._id)) {
      return res.status(403).json({ message: "Unauthorized to delete this comment" });
    }

    await comment.remove();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    console.error("Delete Comment Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
