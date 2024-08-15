const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  category: { type: String },
  amount: { type: Number, required: true },
  payer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  splitBetween: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      amount: { type: Number },
    },
  ],
  splitOption: { type: String, enum: ['equally', 'unequally'], default: 'equally' },
  reimbursement: { type: Boolean, default: false },
  notes: { type: String },
  trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
});

module.exports = mongoose.model('Expense', ExpenseSchema);
