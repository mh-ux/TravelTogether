const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    type: { type: String, required: true },
    dates: { type: Date, required: true },
    time: { type: String, required: true },
    links: [{ type: String }],
    description: String,
    pictures: [{ type: String }],
});

const itinerarySchema = new mongoose.Schema({
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
    items: [itemSchema],
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary;
