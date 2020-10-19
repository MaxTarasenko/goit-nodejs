const express = require('express');
const authRouter = express.Router();
const AuthControl = require('./auth.controller');

authRouter.post(
  '/api/auth/register',
  AuthControl.validateAddUser,
  AuthControl.registerUser,
);

authRouter.post(
  '/api/auth/login',
  AuthControl.validateLoginUser,
  AuthControl.loginUser,
);

authRouter.post(
  '/api/auth/logout',
  AuthControl.authorize,
  AuthControl.logoutUser,
);

authRouter.get('/api/auth/verify/:verificationToken', AuthControl.verify);

module.exports = authRouter;
