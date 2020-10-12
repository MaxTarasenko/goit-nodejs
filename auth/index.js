const { registration, login, logout, authorize } = require('./auth');
const { validation } = require('./auth.validate');
const avatarCreator = require('./auth.avatar');

module.exports = {
  registration,
  login,
  logout,
  authorize,
  validation,
  avatarCreator,
};
