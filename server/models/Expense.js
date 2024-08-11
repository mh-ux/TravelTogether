const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  reimbursement: { type: Boolean, default: false },
  payer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  splitBetween: [{ 
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number }
  }],
  splitOption: { type: String, enum: ['equally', 'unequally'], default: 'equally' },
  notes: { type: String },
  trip: { type: Schema.Types.ObjectId, ref: 'Trip', required: true }, // Tied to trip
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', ExpenseSchema);
