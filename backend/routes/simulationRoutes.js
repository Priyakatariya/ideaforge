const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getSimulationData } = require('../controllers/simulationController');

// @route   GET api/simulation
// @desc    Get predictive simulation data
// @access  Private
router.get('/', auth, getSimulationData);

module.exports = router;
