const express = require('express');
const { check } = require('express-validator');
const { createTrip, getAllTrips, getTripById, updateTrip } = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');

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
router.get('/:tripId', protect, getTripById);
router.put('/:tripId', protect, updateTrip);
router.post('/create', protect, createTrip);

module.exports = router;
