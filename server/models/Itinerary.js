// models/Itinerary.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItinerarySchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  trip: { type: Schema.Types.ObjectId, ref: 'Trip', required: true }
});

module.exports = mongoose.model('Itinerary', ItinerarySchema);
