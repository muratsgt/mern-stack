const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const validator = require("express-validator");

exports.authRegister = async (req, res) => {
    // TODO: register func.
    const { firstName, lastName, email, password } = req.body;

    // validate the fields
    const validationErr = validator.validationResult(req);
    console.log(`validationErr`, validationErr);
    if(validationErr.errors.length > 0){
        return res
            .status(400)
            .json({ errors: validationErr.errors });
    }


    // check if email registered before
    const userExist = await User.findOne({ email: email });
    if (userExist) {
        return res
            .status(400)
            .json({ errors: [{ message: "User already exists!" }] });
    }


    // crypt password
    const salt = await bcrypt.genSalt(10);    // salt is like complexity of crypt
    const newPassword = await bcrypt.hash(password, salt);


    // save user to DB
    const user = new User({
        firstName,  // this means => firstName: firstName
        lastName,
        email,
        password: newPassword,
    });
    try {
        await user.save();
    } catch (error) {
        res.send(error.message);
    }

    res.send("Register Completed.");
};

exports.authLogin = (req, res) => {
    // TODO: login func.
    res.send("Login Completed.");
};