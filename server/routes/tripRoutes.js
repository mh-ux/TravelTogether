const express = require('express');
const { check } = require('express-validator');
const { createTrip, getAllTrips, getTripById, updateTrip } = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');
const Trip = require('../models/Trip'); 

const router = express.Router();

router.post('/create', [
    protect,
    [
        check('title', 'Title is required').not().isEmpty(),
        check('startDate', 'Start date is required').not().isEmpty(),
        check('endDate', 'End date is required').not().isEmpty(),
    ]
], createTrip);

router.get('/', protect, getAllTrips);
router.get('/:tripId/group', async (req, res) => {
    try {
      const trip = await Trip.findById(req.params.tripId).populate('group');
      if (!trip) return res.status(404).send('Trip not found');
      res.json({ groupId: trip.group._id });
    } catch (err) {
      res.status(500).send('Server error');
    }
  });
router.get('/:tripId', protect, getTripById);
router.put('/:tripId', protect, updateTrip);
router.post('/create', protect, createTrip);
router.post('/:tripId/guests', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    if (!trip) return res.status(404).send('Trip not found');

    trip.guests.push(req.body);
    await trip.save();

    res.json(trip.guests);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get the guest list for a trip
router.get('/:tripId/guests', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    if (!trip) return res.status(404).send('Trip not found');

    res.json(trip.guests);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
