const Avatar = require('avatar-builder');
const fs = require('fs');
const minifyImage = require('./minifyImage.service');

// Avatar Creation
const generateAvatars = async name => {
  try {
    const filepath = `tmp/avatar-${name}.jpg`;
    const avatar = Avatar.male8bitBuilder(128);
    const buffer = await avatar.create('gabriel');
    fs.stat('./tmp', err => {
      if (err) fs.mkdirSync('./tmp', () => {});
      fs.writeFile(filepath, buffer, async () => await minifyImage(filepath));
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = generateAvatars;
