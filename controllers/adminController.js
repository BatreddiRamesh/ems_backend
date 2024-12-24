// controllers/adminController.js
const Event = require('../models/Event');
const validateEvent = require('../validations/eventValidation');

const createEvent = async (req, res) => {
  const { error } = validateEvent(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { title, description, date, location, price, seats, category } = req.body;
  try {
    const newEvent = new Event({ title, description, date, location, price, seats, category });
    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully.', event: newEvent });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

const updateEvent = async (req, res) => {
  const { error } = validateEvent(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: 'Event not found.' });

    res.json({ message: 'Event updated successfully.', event });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found.' });

    res.json({ message: 'Event deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

module.exports = { createEvent, updateEvent, deleteEvent, getEvents };




