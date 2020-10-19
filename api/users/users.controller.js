require('dotenv').config();
const Joi = require('@hapi/joi');
const val = require('../validation/validation');
const usersModel = require('./users.model');
const { host, port } = require('../../config');
const minifyImage = require('../../services/minifyImage.service');

class UsersController {
  // Validation
  validateUpdateContact(req, res, next) {
    const schema = Joi.object(val.updateValidation);
    const validation = schema.validate(req.body);

    if (validation.error) return handleValidationError(res, validation);

    next();
  }

  // GET
  async getCurrentUser({ user: { email, subscription } }, res) {
    try {
      res.status(200).send({ email, subscription });
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  // PATCH
  async updateUser({ user, body: { email, subscription } }, res) {
    try {
      const newUpdateUser = {
        email,
        subscription,
      };

      await usersModel.findByIdAndUpdate(user._id, newUpdateUser);

      res.status(200).send(newUpdateUser);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async updateUserAvatar(req, res) {
    try {
      const { filename, path } = req.file;
      const { user } = req;
      const imgURL = `${host}:${port}/avatars/${filename}`;

      await minifyImage(path);
      await usersModel.findByIdAndUpdate(user._id, { avatarURL: imgURL });

      res.status(200).send(imgURL);
    } catch (err) {
      console.log(err);
    }
  }
}

function handleValidationError(res, val) {
  return res.status(400).send(val.error.message);
}
module.exports = new UsersController();
