const { validationResult } = require('express-validator');
const OnboardingProfile = require('../models/OnboardingProfile');

/**
 * Controller to save or update a user's onboarding data.
 * It finds a profile by the user's ID and updates it, or creates a new one if it doesn't exist.
 */
const saveOnboardingData = async (req, res) => {
  // 1. Validate the incoming request data.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If there are validation errors, return a 400 Bad Request response.
    return res.status(400).json({ errors: errors.array() });
  }

  // 2. Extract the user ID from the request (attached by authMiddleware).
  const userId = req.user.id;
  const formData = req.body;

  try {
    // 3. Find the user's existing profile or create a new one.
    // The `findOneAndUpdate` method is perfect for this "upsert" (update or insert) operation.
    const updatedProfile = await OnboardingProfile.findOneAndUpdate(
      { userId: userId }, // The filter to find the document.
      { ...formData, userId: userId }, // The data to update or insert.
      {
        new: true,    // Return the modified document rather than the original.
        upsert: true, // Create a new document if one doesn't match the filter.
        runValidators: true // Ensure the update operation respects the schema's validation rules.
      }
    );

    // 4. Send a success response.
    console.log(`Successfully saved/updated onboarding data for user: ${userId}`);
    res.status(201).json({
      message: 'Onboarding data saved successfully!',
      profile: updatedProfile,
    });
  } catch (error) {
    // 5. Handle any potential database errors.
    console.error('Error saving data to MongoDB:', error);
    res.status(500).json({ message: 'Failed to save onboarding data due to a server error.' });
  }
};

// FIX: Export the function as a property of an object.
module.exports = {
    saveOnboardingData,
};

