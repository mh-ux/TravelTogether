const Expense = require('../models/Expense');
const User = require('../models/User');
const Trip = require('../models/Trip');

// Create a new expense
exports.createExpense = async (req, res) => {
  const { title, date, category, amount, payer, splitBetween, splitOption, reimbursement, notes, tripId } = req.body;

  try {
    const payerUser = await User.findById(payer);
    const trip = await Trip.findById(tripId);

    let totalAmount = amount;
    if (splitOption === 'equally') {
      const share = totalAmount / splitBetween.length;
      splitBetween.forEach(split => split.amount = share);
    }

    const expense = new Expense({ title, date, category, amount, payer, splitBetween, splitOption, reimbursement, notes, trip: tripId });
    await expense.save();

    trip.expenses.push(expense._id);
    trip.totalSpent += amount;

    if (reimbursement) {
      payerUser.totalPaid += amount;
      payerUser.totalReceived += amount;
      trip.totalReceived += amount;
    } else {
      payerUser.totalPaid += amount;
      splitBetween.forEach(async (split) => {
        const user = await User.findById(split.user);
        user.totalOwed += split.amount;
        user.totalSpent += split.amount;
        await user.save();
      });
    }

    await payerUser.save();
    await trip.save();

    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all expenses for a trip
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ trip: req.params.tripId }).populate('payer splitBetween.user');
    res.status(200).json(expenses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.expenseId);
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    const trip = await Trip.findById(expense.trip);
    if (trip) {
      trip.expenses.pull(expense._id);
      trip.totalSpent -= expense.amount;
      if (expense.reimbursement) {
        trip.totalReceived -= expense.amount;
      }
      await trip.save();
    }

    await expense.remove();
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
