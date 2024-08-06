const Itinerary = require('../models/Itinerary');

const getItineraryByTripId = async (req, res) => {
    const { tripId } = req.params;
    try {
        const itinerary = await Itinerary.findOne({ tripId });
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }
        res.status(200).json(itinerary);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const addItemToItinerary = async (req, res) => {
    const { tripId } = req.params;
    const { eventName, type, dates, time, links, description, pictures } = req.body;

    console.log('Received data:', req.body);

    try {
        const itinerary = await Itinerary.findOne({ tripId });
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }

        const newItem = {
            eventName,
            type,
            dates,
            time,
            links: Array.isArray(links) ? links : links.split(',').map(link => link.trim()),
            description,
            pictures: Array.isArray(pictures) ? pictures : pictures.split(',').map(picture => picture.trim())
        };

        console.log('New item:', newItem);

        itinerary.items.push(newItem);

        await itinerary.save();
        res.status(200).json(itinerary);
    } catch (error) {
        console.error('Error adding item to itinerary:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteItemFromItinerary = async (req, res) => {
    const { tripId, itemId } = req.params;
    try {
        const itinerary = await Itinerary.findOne({ tripId });
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }

        const itemIndex = itinerary.items.findIndex(item => item._id.toString() === itemId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found' });
        }

        itinerary.items.splice(itemIndex, 1);
        await itinerary.save();
        res.status(200).json(itinerary);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getItineraryByTripId,
    addItemToItinerary,
    deleteItemFromItinerary,
};
