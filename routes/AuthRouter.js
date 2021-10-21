const express = require("express");
// const { check } = require("express-validator");
const valMiddleware = require("../middleware/valMiddleware");

const router = express.Router();
const AuthController = require("../controllers/AuthController");

// routes for /api/auth 

/**
 * @route   POST /api/auth/register
 * @desc    Register endpoint
 * @access  Public
 */
router.post("/register",
    valMiddleware.validateEmail,
    valMiddleware.validatePass,
    AuthController.authRegister)

// router.post("/register", mid1, mid2, mid3, AuthController.authRegister) 
// bu sekilde middlewareler eklenebilir


/**
 * @route   POST /api/auth/login
 * @desc    Login endpoint
 * @access  Public
 */
router.post("/login",
    valMiddleware.validateEmail,
    valMiddleware.validatePass,
    AuthController.authLogin)

/**
 * @route   POST /api/auth/forgotpass
 * @desc    Login endpoint
 * @access  Public
 */
router.post("/forgotpass",
    valMiddleware.validateEmail,
    AuthController.authForgotpass)



module.exports = router;