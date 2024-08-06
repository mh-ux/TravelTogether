const express = require('express');
const router = express.Router();
const { getItineraryByTripId, addItemToItinerary, updateItemInItinerary, deleteItemFromItinerary, getItineraryItemById } = require('../controllers/itineraryController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Get itinerary by Trip ID
router.get('/trip/:tripId', protect, getItineraryByTripId);

// Get individual itinerary item by Trip ID and Item ID
router.get('/trip/:tripId/item/:itemId', protect, getItineraryItemById);

// Add item to itinerary
router.post('/trip/:tripId/add-item', protect, upload.single('picture'), addItemToItinerary);

// Update item in itinerary
router.put('/trip/:tripId/item/:itemId', protect, upload.single('picture'), updateItemInItinerary);

// Delete item from itinerary
router.delete('/trip/:tripId/item/:itemId', protect, deleteItemFromItinerary);

module.exports = router;
