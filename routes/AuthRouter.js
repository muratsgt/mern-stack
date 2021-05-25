const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const AuthController = require("../controllers/AuthController");

// routes for /api/auth 

/**
 * @route   POST /api/auth/register
 * @desc    Register endpoint
 * @access  Public
 */
router.post("/register",
    [ // validation middleware
        check("password", "Please enter a password with at least 6 chars.")
            .isLength({ min: 6 }),
        check("email", "Please enter a valid email!")
            .isEmail(),
    ],
    AuthController.authRegister)

// router.post("/register", mid1, mid2, mid3, AuthController.authRegister) 
// bu sekilde middlewareler eklenebilir


/**
 * @route   POST /api/auth/login
 * @desc    Login endpoint
 * @access  Public
 */
router.post("/login",
    [
        check("email", "Please enter a valid email!")
            .isEmail(),
        check("password", "Please enter a password with at least 6 chars.")
            .isLength({ min: 6 }),
    ],
    AuthController.authLogin)


module.exports = router;