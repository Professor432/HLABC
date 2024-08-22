const mongoose = require('mongoose');

const FeeSchema = new mongoose.Schema({
  date: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  amount: { type: String, required: true },
  status: { type: String, enum: ['Completed', 'Pending'], required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Fee', FeeSchema);
