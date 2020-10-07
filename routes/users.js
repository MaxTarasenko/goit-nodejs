const { Router } = require('express');
const route = Router();
const { currentUser, userUpdate, validation } = require('../users');
const { authorize } = require('../auth');

route.get('/api/users/current', [authorize, currentUser]);
route.patch('/api/users', [validation, userUpdate]);

module.exports = route;
