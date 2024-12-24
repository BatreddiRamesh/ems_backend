// routes/clientRoutes.js
const express = require('express');
const { getPublicEvents, registerForEvent } = require('../controllers/clientController');

const router = express.Router();

// Get all upcoming public events (no authentication needed)
router.get('/api/events/public', getPublicEvents);

// Register for an event (client only)
router.post('/api/events/register', registerForEvent);

module.exports = router;
