const OnboardingData = require('../models/OnboardingData');

// Save or update user onboarding data
const saveOnboardingData = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = { ...req.body, userId };

    const updatedData = await OnboardingData.findOneAndUpdate(
      { userId },
      data,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(201).json({
      message: '✅ Onboarding data saved successfully!',
      data: updatedData,
    });
  } catch (error) {
    console.error('❌ Error saving onboarding data:', error);
    res.status(500).json({ message: 'Server error while saving data.' });
  }
};

// Get user onboarding data
const getOnboardingData = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await OnboardingData.findOne({ userId });

    if (!data) {
      return res.status(404).json({ message: 'Onboarding data not found.' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('❌ Error fetching onboarding data:', error);
    res.status(500).json({ message: 'Server error while fetching data.' });
  }
};

module.exports = { saveOnboardingData, getOnboardingData };
