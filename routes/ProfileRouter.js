const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const ProfileController = require("../controllers/ProfileController");
const valMiddleware = require("../middleware/valMiddleware");

// base url: /api/profile

/**
 * @route   GET /api/profile
 * @desc    Profile endpoint
 * @access  Private
 */
router.get("/", authMiddleware, ProfileController.getProfileInfo);

/**
 * @route   POST /api/profile
 * @desc    Profile update
 * @access  Private
 */
router.post("/", authMiddleware,
    valMiddleware.validateEmail.optional(),
    valMiddleware.validatePass.optional(),
    ProfileController.updateProfile);


module.exports = router;