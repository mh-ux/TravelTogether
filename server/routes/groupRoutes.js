const express = require('express');
const { check } = require('express-validator');
const { createGroup, inviteMember, getGroup } = require('../controllers/groupController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', [
    protect,
    [
        check('name', 'Name is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
    ]
], createGroup);

router.post('/invite', protect, inviteMember);

router.get('/:groupId', protect, getGroup);

module.exports = router;
