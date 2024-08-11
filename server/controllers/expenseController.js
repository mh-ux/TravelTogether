const Expense = require('../models/Expense');
const User = require('../models/User');
const Trip = require('../models/Trip');

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
