const express = require('express');
const router = express.Router();
const OnboardingData = require('../models/OnboardingData');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/onboarding
// @desc    Save or update user onboarding data
// @access  Private (token-based check)
router.post('/', authMiddleware, async (req, res) => {
  try {
    // Get userId from the decoded token (set by authMiddleware)
    const userId = req.user.id;
    
    if (!userId) {
      return res.status(401).json({ message: 'User ID missing in token' });
    }

    // --- EXTRACT FORM DATA ---
    const {
      goals,
      wakeUpTime,
      workDuration,
      exerciseFrequency,
      currentMood,
      stressLevel,
      journalEntry,
    } = req.body;

    // --- BASIC VALIDATION ---
    if (!goals || !wakeUpTime || !workDuration) {
      return res.status(400).json({ message: 'Missing required fields: goals, wakeUpTime, or workDuration.' });
    }

    // --- UPSERT USER DATA ---
    const updatedData = await OnboardingData.findOneAndUpdate(
      { userId },                     // Find existing data by userId
      {
        userId,
        goals,
        wakeUpTime,
        workDuration,
        exerciseFrequency,
        currentMood,
        stressLevel,
        journalEntry,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.status(201).json({
      message: '✅ Onboarding data saved successfully!',
      data: updatedData,
    });
  } catch (error) {
    console.error('❌ Error saving onboarding data:', error);
    return res.status(500).json({ message: 'Server error while saving data.' });
  }
});

module.exports = router;
