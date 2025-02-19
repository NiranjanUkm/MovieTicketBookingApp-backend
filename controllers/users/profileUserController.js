const ProfileUserModel = require('../../models/profileUserSchema');
const AuthUserModel = require('../../models/authUserSchema');

// ✅ Fetch User Profile
exports.getProfile = async (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    const userId = req.user._id;

    // Try fetching the profile from ProfileUserModel
    let profile = await ProfileUserModel.findOne({ _id: userId });

    // If profile doesn't exist, fetch from AuthUserModel and create default profile
    if (!profile) {
        const authUser = await AuthUserModel.findById(userId).select("username email");

        if (!authUser) {
            return res.status(404).json({ error: "User not found" });
        }

        profile = new ProfileUserModel({
            _id: userId,  // Ensure profile ID matches user ID
            name: authUser.username,
            email: authUser.email,
            phone: "",
            address: "",
            city: "",
            state: "",
            country: "",
            pincode: ""
        });

        await profile.save();
    }

    res.status(200).json(profile);
};

// ✅ Update User Profile
exports.updateProfile = async (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    const userId = req.user._id;
    const { name, email, phone, address, city, state, country, pincode } = req.body;

    const updatedProfile = await ProfileUserModel.findByIdAndUpdate(
        userId,
        { name, email, phone, address, city, state, country, pincode },
        { new: true, runValidators: true, upsert: true } // Create profile if it doesn't exist
    );

    res.status(200).json({ message: "Profile updated successfully", updatedProfile });
};
