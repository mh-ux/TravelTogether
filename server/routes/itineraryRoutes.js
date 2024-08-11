const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');

// Define routes
router.get('/', itineraryController.getAllItineraries);
router.post('/', itineraryController.createItinerary);
router.delete('/:id', itineraryController.deleteItinerary);
router.get('/trip/:tripId', itineraryController.getItinerariesByTrip); // Add this line

module.exports = router;

