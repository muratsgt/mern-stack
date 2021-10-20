const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const ProfileController = require("../controllers/ProfileController");

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
router.post("/", authMiddleware, ProfileController.updateProfile);


module.exports = router;