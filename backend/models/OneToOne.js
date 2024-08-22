const mongoose = require('mongoose');

const OneToOneSchema = new mongoose.Schema({
  date: { type: String, required: true },
  metWith: { type: String, required: true },
  invitedBy: { type: String, required: true },
  location: { type: String, required: true },
  topic: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const OneToOne = mongoose.model('OneToOne', OneToOneSchema);

module.exports = OneToOne;