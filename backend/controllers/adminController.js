const User = require('../models/user.js')
// Get all users - Admin only
exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select('-password'); // Exclude passwords
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
}

exports.deleteUser = async (req, res) => {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: "Error deleting User", error });
      }
}

exports.updateUserStatus = async (req, res) => {// status should be 'active', 'deactivated', or 'pending'
      const user = await User.findById(req.params.id);
      const updateUser = await User.findByIdAndUpdate()
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.status === "active" ? user.status = "deactivated" : user.status = "active";
      try {
        await user.save();
        res.status(200).json({ message: "User status updated", user });
      } catch (error) {
        res.status(500).json({ message: "Error updating user status", error });
}
}


// exports.approveUser = async (req, res) => {
//     try {
//       const user = await User.findByIdAndUpdate(
//         req.params.id,
//         { status: 'active' },
//         { new: true, runValidators: true }
//       ).select('-password');
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
//       res.status(200).json({ message: "User approved", user });
//     } catch (error) {
//       res.status(500).json({ message: "Error approving user", error });
//     }
// }