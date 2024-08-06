const Trip = require('../models/Trip');
const { createItinerary } = require('./itineraryController');
const Itinerary = require('../models/Itinerary');

// Create a new trip
const createTrip = async (req, res) => {
    const { title, description, startDate, endDate, groupId } = req.body;
    const userId = req.user._id;

    try {
        const tripData = {
            title,
            description,
            startDate,
            endDate,
            creator: userId,
            group: groupId || null,
        };

        const trip = new Trip(tripData);
        const savedTrip = await trip.save();

        const itinerary = new Itinerary({ tripId: savedTrip._id, items: [] });
        const savedItinerary = await itinerary.save();

        // Update the trip with the created itinerary
        savedTrip.itinerary = savedItinerary._id;
        await savedTrip.save();

        console.log('Itinerary ID:', itineraryId);

        res.status(201).json({ trip: savedTrip, itineraryId });
    } catch (error) {
        console.error('Error creating trip and itinerary:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all trips
const getAllTrips = async (req, res) => {
    const userId = req.user._id;

    try {
        const trips = await Trip.find({
            $or: [
                { creator: userId },
                { members: userId }
            ]
        }).populate('creator').populate('group').populate('members').populate('itinerary');

        res.status(200).json(trips);
    } catch (error) {
        console.error('Error fetching trips:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getTripById = async (req, res) => {
    const userId = req.user._id;
    const { tripId } = req.params;

    try {
        const trip = await Trip.findOne({
            _id: tripId,
            $or: [
                { creator: userId },
                { members: userId }
            ]
        }).populate('itinerary').populate('creator').populate('group').populate('members');

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        res.status(200).json(trip);
    } catch (error) {
        console.error('Error fetching trip:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update a trip by ID
const updateTrip = async (req, res) => {
    const { tripId } = req.params;
    const { title, description, startDate, endDate, groupId } = req.body;

    try {
        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        trip.title = title || trip.title;
        trip.description = description || trip.description;
        trip.startDate = startDate || trip.startDate;
        trip.endDate = endDate || trip.endDate;
        trip.group = groupId || trip.group;

        const updatedTrip = await trip.save();

        res.status(200).json(updatedTrip);
    } catch (error) {
        console.error('Error updating trip:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createTrip,
    getAllTrips,
    getTripById,
    updateTrip,
};
