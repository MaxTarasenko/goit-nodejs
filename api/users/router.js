const { Router } = require('express');
const usersRouter = Router();
const path = require('path');
const multer = require('multer');
const UsersControl = require('./users.controller');
const AuthControl = require('../auth/auth.controller');

const storage = multer.diskStorage({
  destination: 'public/uploads',
  filename: function (req, file, cb) {
    const { fieldname, originalname } = file;
    const { user } = req;
    cb(null, fieldname + '-' + user.email + path.extname(originalname));
  },
});
const upload = multer({ storage: storage });

usersRouter.get(
  '/api/users/current',
  AuthControl.authorize,
  UsersControl.getCurrentUser,
);

usersRouter.patch(
  '/api/users',
  AuthControl.authorize,
  UsersControl.validateUpdateContact,
  UsersControl.updateUser,
);

usersRouter.patch(
  '/api/users/avatars',
  AuthControl.authorize,
  upload.single('avatar'),
  UsersControl.updateUserAvatar,
);

module.exports = usersRouter;
