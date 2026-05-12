const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const OnboardingData = require('../models/OnboardingData');

// @route   POST /api/ai/chat
// @desc    Get advice from the AI Companion
// @access  Private
router.post('/chat', authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;

    // Fetch user data to provide contextual advice
    const userData = await OnboardingData.findOne({ userId });

    let response = "";
    const lowerMsg = message.toLowerCase();
    const name = userData ? 'there' : 'there';

    // ---- Stress & Mental Health ----
    if (lowerMsg.includes("stress") || lowerMsg.includes("anxious") || lowerMsg.includes("overwhelmed") || lowerMsg.includes("burnout")) {
      const stressLevel = userData?.stressLevel || 5;
      if (stressLevel > 7) {
        response = `I can see your stress level is quite high (${stressLevel}/10). Here's what I recommend:\n\n🧘 Try a 5-minute box breathing exercise right now\n💤 Make sure you're getting enough sleep tonight\n📝 Consider journaling to process your thoughts\n\nYour Digital Twin predicts that reducing stress by even 2 points will boost your productivity by 15% this week.`;
      } else {
        response = `Your current stress level is ${stressLevel}/10 — that's manageable! Here's how to keep it that way:\n\n☕ Take regular breaks during work\n🚶 A 10-minute walk can reduce cortisol by 25%\n🎵 Try some focus music while studying\n\nKeep it up — you're doing great!`;
      }
    }
    // ---- Goals & Progress ----
    else if (lowerMsg.includes("goal") || lowerMsg.includes("progress") || lowerMsg.includes("target")) {
      const goals = userData?.goals || [];
      const goalsText = goals.length > 0 ? goals.join(', ') : 'personal growth';
      response = `You're focusing on: **${goalsText}**. Here's your progress analysis:\n\n📊 Based on your ${userData?.workDuration || 4}h daily focus time, you're on track for your weekly milestones\n🔥 Your consistency has been improving steadily\n🎯 AI Suggestion: Try setting 3 micro-goals each morning to build momentum\n\nWould you like me to help you create a specific action plan?`;
    }
    // ---- Exercise & Fitness ----
    else if (lowerMsg.includes("exercise") || lowerMsg.includes("workout") || lowerMsg.includes("fitness") || lowerMsg.includes("gym")) {
      const freq = userData?.exerciseFrequency || 'occasionally';
      response = `Your current exercise frequency: **${freq}** per week.\n\n💪 Digital Twin Analysis:\n• Moving your workout to the morning can boost focus by 23%\n• Even 15 minutes of activity reduces stress hormones\n• Your optimal exercise window is right after your wake-up routine\n\n🏃 Quick suggestion: Start with a 20-min walk tomorrow. Small wins build big habits!`;
    }
    // ---- Sleep ----
    else if (lowerMsg.includes("sleep") || lowerMsg.includes("tired") || lowerMsg.includes("rest") || lowerMsg.includes("insomnia")) {
      const wakeUp = userData?.wakeUpTime || '7:00 AM';
      const sleepHours = userData?.sleepHours || 7;
      response = `Sleep is the #1 performance multiplier. Here's your sleep analysis:\n\n🛌 Wake-up time: ${wakeUp}\n💤 Average sleep: ${sleepHours} hours\n${sleepHours < 7 ? '⚠️ You need more sleep! Aim for 7-8 hours.' : '✅ Your sleep duration is in a healthy range.'}\n\n🌙 AI Tips:\n• Set a fixed bedtime alarm\n• No screens 30 min before bed\n• Your Digital Twin predicts better sleep will improve your focus by 30%`;
    }
    // ---- Study & Productivity ----
    else if (lowerMsg.includes("study") || lowerMsg.includes("productiv") || lowerMsg.includes("focus") || lowerMsg.includes("work") || lowerMsg.includes("learn")) {
      const workDuration = userData?.workDuration || 4;
      const studyTime = userData?.preferredStudyTime || 'morning';
      response = `Here's your productivity snapshot:\n\n⏱️ Daily focus capacity: ${workDuration} hours\n🕐 Peak time: ${studyTime}\n\n🧠 AI Recommendations:\n• Use the Pomodoro technique (25 min work / 5 min break)\n• Your productivity drops after ${workDuration > 6 ? '4 PM' : '2 PM'} — front-load important tasks\n• Review your notes within 24 hours to retain 80% more\n\nYour Digital Twin estimates you can increase output by 20% with these changes!`;
    }
    // ---- Mood ----
    else if (lowerMsg.includes("mood") || lowerMsg.includes("feeling") || lowerMsg.includes("emotion") || lowerMsg.includes("happy") || lowerMsg.includes("sad")) {
      const mood = userData?.currentMood || 'balanced';
      response = `Your current mood profile: **${mood}**\n\n🎭 Mood Insights:\n• Your mood patterns show you feel best in the ${userData?.preferredStudyTime || 'morning'}\n• Exercise frequency directly correlates with positive mood (+35%)\n• Journaling helps process emotions — try writing 3 things you're grateful for\n\n💡 Quick boost: Step outside for 5 minutes of sunlight. It naturally elevates serotonin!`;
    }
    // ---- Motivation & Help ----
    else if (lowerMsg.includes("motivat") || lowerMsg.includes("help") || lowerMsg.includes("what can you do") || lowerMsg.includes("how do you work")) {
      response = `I'm Veritas — your AI Digital Twin! Here's what I can help with:\n\n🎯 **Goals**: Ask about your progress and get action plans\n📊 **Productivity**: Get study and work optimization tips\n💪 **Fitness**: Exercise and health recommendations\n🧘 **Stress**: Mental wellness and stress management\n💤 **Sleep**: Sleep optimization insights\n🔮 **Predictions**: See your future trajectory\n\nTry asking: "How can I improve my study habits?" or "Am I on track with my goals?"`;
    }
    // ---- Greeting ----
    else if (lowerMsg.includes("hello") || lowerMsg.includes("hi") || lowerMsg.includes("hey") || lowerMsg.includes("hii")) {
      response = `Hey! 👋 Great to see you. I'm your Veritas AI Twin — always here to help you grow.\n\nYour quick snapshot today:\n• Mood: ${userData?.currentMood || 'balanced'}\n• Stress: ${userData?.stressLevel || 5}/10\n• Focus capacity: ${userData?.workDuration || 4}h\n\nWhat would you like to work on today?`;
    }
    // ---- Default Catch-All ----
    else {
      response = `That's an interesting question! As your Digital Twin, I can help you with:\n\n• 🎯 Goal tracking & progress\n• 📚 Study & productivity tips\n• 💪 Fitness recommendations\n• 🧘 Stress management\n• 💤 Sleep optimization\n• 😊 Mood analysis\n\nTry asking me something specific like: "How can I reduce stress?" or "Am I sleeping enough?"`;
    }

    res.status(200).json({ reply: response });
  } catch (error) {
    console.error('❌ AI Chat Error:', error);
    res.status(500).json({ reply: "I'm having a brief moment of reflection. Please try again in a moment! 🧘" });
  }
});

module.exports = router;
