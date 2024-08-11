// routes/expenseRoutes.js
const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.post('/', expenseController.createExpense);
router.get('/trip/:tripId', expenseController.getExpensesByTrip);

module.exports = router;
