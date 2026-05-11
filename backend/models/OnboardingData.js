// models/OnboardingData.js
const mongoose = require('mongoose');

const OnboardingSchema = new mongoose.Schema({
  // Link to the user who submitted this data
  userId: {
    type: String,
    required: true,
    unique: true // Ensures one onboarding entry per user
  },
  goals: {
    type: [String],
    required: true,
  },
  wakeUpTime: {
    type: String,
    required: true,
  },
  workDuration: {
    type: Number,
    required: true,
  },
  exerciseFrequency: {
    type: String,
    required: true,
  },
  currentMood: {
    type: String,
    required: true,
  },
  stressLevel: {
    type: Number,
    required: true,
  },
  journalEntry: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// The 'OnboardingData' is the name of the collection in your DB
module.exports = mongoose.model('OnboardingData', OnboardingSchema);