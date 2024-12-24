// models/Registration.js
const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  clientName: { type: String, required: true},
  clientEmail: { type: String, required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, required: true },
  registrationDate: { type: Date, default: Date.now },
  
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
