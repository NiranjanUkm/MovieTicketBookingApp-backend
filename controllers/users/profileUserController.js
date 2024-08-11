const ProfileUserModel = require('../../models/profileUserSchema');
// const authenticate = require('../../middleware/authenticate');

// Update User Profile
exports.updateProfile = async (req, res) => {
  const userId = req.user._id; // Extracted from JWT
  const { name, email, phone, Address } = req.body;
  const updatedUser = await ProfileUserModel.findByIdAndUpdate(
    userId,
    { name, email, phone, Address },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json({ message: 'Profile updated successfully', updatedUser });

};
