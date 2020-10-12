const { Router } = require('express');
const route = Router();
const { authorize } = require('../auth');
const path = require('path');
const multer = require('multer');
const User = require('../users/users.model');

const storage = multer.diskStorage({
  destination: function (_, _, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + req.user._id + path.extname(file.originalname),
    );
  },
});

const upload = multer({
  storage: storage,
});

route.patch(
  '/api/users/current/avatars',
  authorize,
  upload.single('avatar'),
  ({ file, user }, res) => {
    const imgUrl = 'http://localhost:3000/uploads/' + file.filename;
    User.findByIdAndUpdate(user._id, { avatarURL: imgUrl }).exec();
    res.json({ avatarURL: imgUrl });
  },
);

module.exports = route;
