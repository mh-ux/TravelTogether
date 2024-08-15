const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: false },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    itinerary: { type: mongoose.Schema.Types.ObjectId, ref: 'Itinerary' }, // Reference to Itinerary
    expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }], // Added expenses array
    totalSpent: { type: Number, default: 0 }, // Total spent on the trip
  totalReceived: { type: Number, default: 0 }, // Total received (from reimbursements)
  guests: [
    {
      name: String,
      contact: String,
      rsvp: { type: String, enum: ['Attending', 'Not Attending', 'Maybe'], default: 'Maybe' },
    },
  ],
});

const Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;
