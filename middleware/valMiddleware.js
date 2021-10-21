const { check } = require("express-validator");

exports.validateEmail = check("email", "Please enter a valid email!")
    .isEmail();

exports.validatePass = check("password", "Please enter a password with at least 6 chars.")
    .isLength({ min: 6 });