const mongoose = require('mongoose');

const SimulationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dataPoints: [
    {
      day: Number,
      productivity: Number,
      health: Number,
      optimizedProductivity: Number,
      optimizedHealth: Number
    }
  ],
  insights: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Simulation', SimulationSchema);
