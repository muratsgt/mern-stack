const User = require("../models/UserModel");

exports.getProfileInfo = async (req, res) => {
    try {
        const userData = User.findById(req.decodedUser._id).select("-password");
        res.status(200).json(userData);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    };
}

exports.updateProfile = async (req, res) => {
    // TODO: update profile fn
    res.send("Profile Updated");
}