const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  occupation: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Member', 'Admin'], required: true },
  token: { type: String, default: null },
});

module.exports = mongoose.model('User', UserSchema);