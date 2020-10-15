const fs = require('fs');
const Joi = require('@hapi/joi');
const Avatar = require('avatar-builder');
const val = require('../validation/validation');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const usersModel = require('./users.model');

require('dotenv').config();

class UsersController {
  // Validation
  validateUpdateContact(req, res, next) {
    const schema = Joi.object(val.updateValidation);
    const validation = schema.validate(req.body);

    if (validation.error) return handleValidationError(res, validation);

    next();
  }

  // Avatar Creation
  async generateAvatars(name) {
    try {
      if (!fs.existsSync('./tmp')) {
        fs.mkdirSync('./tmp');
      }

      const filepath = `tmp/avatar-${name}.jpg`;
      const avatar = Avatar.male8bitBuilder(128);
      await avatar
        .create('gabriel')
        .then(buffer => fs.writeFileSync(filepath, buffer));
      this.minifyImage(filepath);
    } catch (err) {
      console.log(err.message);
    }
  }

  // Image Compression
  async minifyImage(filepath) {
    try {
      await imagemin([filepath], {
        destination: 'public/avatars',
        plugins: [imageminJpegtran()],
      });
      fs.unlinkSync(filepath);
    } catch (err) {
      console.log(err);
    }
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
      const imgURL = `localhost:3000/avatars/${filename}`;

      this.minifyImage(path);
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
