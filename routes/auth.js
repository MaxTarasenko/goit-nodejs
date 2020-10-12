const { Router } = require('express');
const route = Router();
const {
  registration,
  login,
  logout,
  validation,
  authorize,
  avatarCreator,
} = require('../auth');

route.post('/api/auth/register', [validation, registration, avatarCreator]);

route.post('/api/auth/login', [validation, login]);

route.post('/api/auth/logout', [authorize, logout]);

module.exports = route;
