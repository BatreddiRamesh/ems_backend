// routes/adminRoutes.js
const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');
const { createEvent, updateEvent, deleteEvent, getEvents } = require('../controllers/adminController');

const router = express.Router();

// Create a new event (admin only)
router.post('/api/events', authMiddleware, adminMiddleware, createEvent);

// Update an existing event (admin only)
router.put('/api/events/:id', authMiddleware, adminMiddleware, updateEvent);

// Delete an event (admin only)
router.delete('/api/events/:id', authMiddleware, adminMiddleware, deleteEvent);

// Get all events (admin only)
router.get('/api/events', authMiddleware, adminMiddleware, getEvents);

module.exports = router;
