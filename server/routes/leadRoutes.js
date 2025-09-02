const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

// @route   POST api/leads
// @desc    Create a new lead
// @access  Public
router.post('/', leadController.createLead);

// @route   GET api/leads
// @desc    Get all leads
// @access  Public
router.get('/', leadController.getLeads);

module.exports = router;
