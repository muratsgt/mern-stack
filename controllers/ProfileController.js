const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const validator = require("express-validator");

// profile info
exports.getProfileInfo = async (req, res) => {
    try {
        const userData = await User.findById(req.decodedUser._id, "-password");
        res.status(200).json(userData);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    };
}

// updates profile
exports.updateProfile = async (req, res) => {
    let { firstName, lastName, email, password } = req.body;

    // validate the fields
    const validationErr = validator.validationResult(req);
    if (validationErr.errors.length > 0) {
        return res
            .status(400)
            .json({ errors: validationErr.errors });
    }

    // check email registered before
    const userExist = await User.exists({ email: email });
    if (userExist) {
        return res.status(400).send("User Exists");
    };

    if (password) {
        // crypt password
        const salt = await bcrypt.genSalt(10);    // salt is like complexity of crypt
        password = await bcrypt.hash(password, salt);
    }

    try {
        await User.findByIdAndUpdate(req.decodedUser._id,
            { firstName, lastName, email, password });
        res.status(200).send("Profile Updated");
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
}