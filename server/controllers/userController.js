import User from "../models/User.js";
export const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) res.status(404).json({ message: "User not found" });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserProfile = async (req,res)=>{
  try {
    const { name, username, email } = req.body;

    // Ensure that at least one field is provided to update
    if (!name && !username && !email) {
      return res.status(400).json({ message: "Please provide data to update" });
    }

    // Find the user by the ID stored in the token
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user data
    user.name = name || user.name;
    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();

    // Return the updated user profile
    res.status(200).json({
      message: "User profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export const changePassword = async (req,res)=>{
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Both old and new passwords are required" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Change Password Error:", err);
    res.status(500).json({ message: "Server error" });
  }
  }


  export const uploadProfilePic=async (req,res)=>{
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
      }
  
      const user = await User.findById(req.user.id);
      user.profilePic = req.file.path;
      await user.save();
  
      res.status(200).json({ message: "Profile picture updated", profilePic: user.profilePic });
    } catch (err) {
      console.error("Upload Error:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
