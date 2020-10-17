const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const val = require('../validation/validation');
const usersModel = require('../users/users.model');
const { host, port, JWT_KEY } = require('../../config');
const generateAvatars = require('../../services/generateAvatars.service');

require('dotenv').config();

class AuthController {
  // Validation
  validateAddUser(req, res, next) {
    const schema = Joi.object(val.createValidation);
    const validation = schema.validate(req.body);

    if (validation.error) return handleValidationError(res, validation);

    next();
  }
  validateLoginUser(req, res, next) {
    const schema = Joi.object(val.loginValidation);
    const validation = schema.validate(req.body);

    if (validation.error) return handleValidationError(res, validation);

    next();
  }

  // Checking the token
  async authorize(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      let userId;

      try {
        userId = await jwt.verify(token, JWT_KEY).id;
      } catch (err) {
        return res.status(401).json('Not authorized');
      }
      const user = await usersModel.findById(userId);

      if (!user || user.token !== token)
        return res.status(401).send('Not Authorize');

      req.user = user;
      req.token = token;

      next();
    } catch (err) {
      res.status(401).json('Not authorized');
    }
  }

  // POST
  async registerUser(req, res) {
    try {
      const newUser = { ...req.body };
      const existedUser = await usersModel.findOne({
        email: newUser.email,
      });

      if (existedUser) return res.status(409).send('Email in use');

      const hashedPass = await bcrypt.hash(newUser.password, 10);

      await generateAvatars(newUser.email);
      const imgPath = `${host}:${port}/avatars/avatar-${newUser.email}.jpg`;

      const createdUser = await usersModel.create({
        ...newUser,
        password: hashedPass,
        avatarURL: imgPath,
      });

      res.status(201).send({
        user: {
          email: createdUser.email,
          subscription: createdUser.subscription,
        },
      });
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async loginUser({ body: { email, password } }, res) {
    try {
      const user = await usersModel.findOne({ email });

      if (!user) return res.status(401).send('Email or password is wrong');

      const isValidPass = await bcrypt.compare(password, user.password);
      if (!isValidPass)
        return res.status(401).send('Email or password is wrong');

      const token = jwt.sign({ id: user._id }, JWT_KEY, {
        expiresIn: '20 days',
      });

      await usersModel.findByIdAndUpdate(user._id, { token });

      res.status(200).send({
        user: { email: user.email, subscription: user.subscription },
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send();
    }
  }

  async logoutUser({ user }, res) {
    try {
      await usersModel.findByIdAndUpdate(user._id, { token: null });

      res.status(204).send();
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
}

function handleValidationError(res, val) {
  return res.status(400).send(val.error.message);
}

module.exports = new AuthController();
