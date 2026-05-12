const express = require('express');
const router = express.Router();
const OnboardingData = require('../models/OnboardingData');
const authMiddleware = require('../middleware/authMiddleware');

const { saveOnboardingData, getOnboardingData } = require('../controllers/onboardingController');

// @route   POST /api/onboarding
// @desc    Save or update user onboarding data
// @access  Private
router.post('/', authMiddleware, saveOnboardingData);

// @route   GET /api/onboarding
// @desc    Get user onboarding data
// @access  Private
router.get('/', authMiddleware, getOnboardingData);

module.exports = router;
