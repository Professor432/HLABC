const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
  date: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  attendees: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      attended: { type: Boolean, default: false }
    }
  ]
});

module.exports = mongoose.model('Meeting', MeetingSchema);
