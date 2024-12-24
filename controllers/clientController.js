// controllers/clientController.js
const Event = require('../models/Event');
const Registration = require('../models/Registration');

const getPublicEvents = async (req, res) => {
  try {
    // Get current date as string in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split('T')[0]; // Format: "2024-12-15"

    // Query to get events with a date equal to or greater than today's date
    const events = await Event.find({ date: { $gte: currentDate } }); // Only upcoming events

    res.json(events); // Send the events back as a JSON response
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};


const registerForEvent = async (req, res) => {
  const { clientName, clientEmail, eventId } = req.body;
console.log("",req.body)
  // Validate the input fields
  if (!clientName || !clientEmail || !eventId) {
    return res.status(400).json({ message: 'Please provide all required fields (clientName, clientEmail, eventId).' });
  }

  try {
    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    // Check if there are available seats for the event
    if (event.seats <= 0) {
      return res.status(400).json({ message: 'No seats available for this event.' });
    }

    // Check if the user is already registered for the event by email
    const existingRegistration = await Registration.findOne({ eventId, clientEmail });
    if (existingRegistration) {
      return res.status(400).json({ message: 'You are already registered for this event.' });
    }

    // Create a new registration entry
    const registration = new Registration({
      clientName,
      clientEmail,
      eventId,
    });
    await registration.save();

    // Decrease available seats in the event
    event.seats -= 1;
    await event.save();

    // Return success response
    res.json({ message: 'Registered successfully for the event.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

module.exports = { getPublicEvents, registerForEvent };
