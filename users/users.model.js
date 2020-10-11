const mongoose = require('mongoose');

// Creating a Database Schema
const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    avatarURL: String,
    subscription: {
      type: String,
      enum: ['free', 'pro', 'premium'],
      default: 'free',
    },
    token: String,
  },
  {
    versionKey: false,
  },
);

// Creating a Model for a Database
const User = mongoose.model('users', userSchema);

module.exports = User;
