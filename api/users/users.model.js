const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema(
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

const usersModel = mongoose.model('Users', usersSchema, 'users');

module.exports = usersModel;
