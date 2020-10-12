const AvatarGenerator = require('avatar-generator');
const User = require('../users/users.model');
const path = require('path');
const avatar = new AvatarGenerator({
  parts: ['background', 'face', 'clothes', 'head', 'hair', 'eye', 'mouth'], //order in which sprites should be combined
  partsLocation: path.join(__dirname, '../node_modules/avatar-generator/img'), // path to sprites
  imageExtension: '.png', // sprite file extension
});

const imgUrl = 'http://localhost:3000/images/';

const avatarCreator = ({ body }) =>
  avatar.generate(body.email, 'male').then(data => {
    User.findByIdAndUpdate(body.id, {
      avatarURL: imgUrl + body.id + '.png',
    }).exec();
    data.png().toFile(`public/images/${body.id}.png`);
  });

module.exports = avatarCreator;
