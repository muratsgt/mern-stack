const express = require("express");

const router = express.Router();

const AuthController = require("../controllers/AuthController");

// routes for /api/auth 

/**
 * @route   POST /api/auth/register
 * @desc    Register endpoint
 * @access  Public
 */
router.post("/register", AuthController.authRegister)

// router.post("/register", mid1, mid2, mid3, AuthController.authRegister) 
// bu sekilde middleware eklenebilir


/**
 * @route   POST /api/auth/login
 * @desc    Login endpoint
 * @access  Private
 */
router.post("/login", AuthController.authLogin)


module.exports = router;