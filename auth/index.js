const { registration, login, logout, authorize } = require('./auth');
const { validation } = require('./auth.validate');

module.exports = { registration, login, logout, authorize, validation };
