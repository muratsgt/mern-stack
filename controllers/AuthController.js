const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const validator = require("express-validator");
const jwt = require('jsonwebtoken');

// register controller
exports.authRegister = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // validate the fields
    const validationErr = validator.validationResult(req);
    if (validationErr.errors.length > 0) {
        return res
            .status(400)
            .json({ errors: validationErr.errors });
    }


    // check if email registered before
    const userData = await User.findOne({ email: email });
    if (userData) {
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
    };

    res.send("Register Completed.");
};


// login controller
exports.authLogin = async (req, res) => {
    const { email, password } = req.body;

    // field validation
    const validationErr = validator.validationResult(req);
    if (validationErr.errors.length > 0) {
        return res
            .status(400)
            .json({ errors: validationErr.errors });
    };


    // email exist check
    const userData = await User.findOne({ email: email });
    if (!userData) {
        return res
            .status(400)
            .json({ errors: [{ message: "User doesn't exist!" }] });
    };


    // password check
    const passwordMatch = await bcrypt.compare(password, userData.password);
    if (!passwordMatch) {
        return res
            .status(400)
            .json({ errors: [{ message: "Invalid password!" }] });
    };


    // authentication return JSON WEB TOKEN - JWT
    jwt.sign(
        { userData },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" },
        (err, token) => {
            if (err) {
                return res
                    .status(400)
                    .json({ errors: [{ message: "Unknown error" }] })
            }
            res.send(token);
        }
    );


    // res.send("Login Completed.");
};