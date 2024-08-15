// routes/expenseRoutes.js
//const express = require('express');
//const router = express.Router();
//const expenseController = require('../controllers/expenseController');
//const { getExpenses, addExpense } = require('../controllers/expenseController');


//router.post('/', expenseController.createExpense);
//router.get('/trip/:tripId', expenseController.getExpensesByTrip);
//router.get('/', getExpenses);  // Ensure `getExpenses` is properly imported and defined
//router.post('/', addExpense);

//module.exports = router;

const express = require('express');
const router = express.Router();
const { createExpense, getExpenses, deleteExpense } = require('../controllers/expenseController');

// Define routes
router.post('/', createExpense);
router.get('/:tripId', getExpenses);  // Retrieves expenses for a specific trip
router.delete('/:expenseId', deleteExpense);  // Deletes a specific expense

module.exports = router;
