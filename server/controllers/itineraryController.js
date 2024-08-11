// controllers/itineraryController.js
const Itinerary = require('../models/Itinerary');
const Trip = require('../models/Trip');

exports.getAllItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find().populate('trip');
    res.json(itineraries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createItinerary = async (req, res) => {
  const { name, location, date, tripId } = req.body;

  try {
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const itinerary = new Itinerary({ name, location, date, trip: tripId });
    const newItinerary = await itinerary.save();

    trip.itineraries.push(newItinerary._id);
    await trip.save();

    res.status(201).json(newItinerary);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) return res.status(404).json({ message: 'Itinerary not found' });

    const trip = await Trip.findById(itinerary.trip);
    if (trip) {
      trip.itineraries.pull(itinerary._id);
      await trip.save();
    }

    await Itinerary.deleteOne({ _id: req.params.id });
    res.json({ message: 'Itinerary deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getItinerariesByTrip = async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ trip: req.params.tripId });
    res.json(itineraries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
