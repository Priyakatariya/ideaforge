const Simulation = require('../models/Simulation');
const Onboarding = require('../models/OnboardingData');

exports.getSimulationData = async (req, res) => {
  try {
    const onboarding = await Onboarding.findOne({ userId: req.user.id });
    if (!onboarding) {
      return res.status(404).json({ message: 'Onboarding data not found' });
    }

    // Rule-based simulation generation
    const dataPoints = [];
    const baseProductivity = onboarding.workDuration * 10; // e.g., 6h * 10 = 60
    const baseHealth = onboarding.exerciseFrequency === 'daily' ? 90 : (onboarding.exerciseFrequency.includes('4-5') ? 70 : 50);

    for (let i = 1; i <= 30; i++) {
      // Current Path: slight decay or stagnation if stress is high
      const stressFactor = onboarding.stressLevel > 7 ? (1 - (i * 0.01)) : 1;
      
      dataPoints.push({
        day: i,
        productivity: Math.round(baseProductivity * stressFactor),
        health: Math.round(baseHealth - (onboarding.stressLevel * 0.5 * (i/5))),
        // Optimized Path: Growth if they follow AI advice
        optimizedProductivity: Math.min(100, Math.round(baseProductivity * (1 + (i * 0.015)))),
        optimizedHealth: Math.min(100, Math.round(baseHealth + (i * 0.5)))
      });
    }

    const insights = [];
    if (onboarding.stressLevel > 7) {
      insights.push("High stress detected. Optimized path assumes 20min daily meditation.");
    }
    if (onboarding.workDuration < 4) {
      insights.push("Low focus hours. Optimized path suggests deep work blocks.");
    }

    // Save or just return? For MVP, we'll just return generated data
    res.json({ dataPoints, insights });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
