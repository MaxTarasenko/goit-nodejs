const { Router } = require('express');
const route = Router();
const {
  registration,
  login,
  logout,
  validation,
  authorize,
} = require('../auth');

route.post('/api/auth/register', [validation, registration]);

route.post('/api/auth/login', [validation, login]);

route.post('/api/auth/logout', [authorize, logout]);

module.exports = route;
