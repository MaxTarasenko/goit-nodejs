const Avatar = require('avatar-builder');
const fs = require('fs');
const fsPromises = fs.promises;
const minifyImage = require('./minifyImage.service');
const { pathTMP, filePathTMP } = require('../config');

// Avatar Creation
const generateAvatars = async name => {
  try {
    try {
      await fsPromises.stat(pathTMP);
    } catch (error) {
      await fsPromises.mkdir(pathTMP);
    }
    const avatar = Avatar.male8bitBuilder(128);
    const buffer = await avatar.create('gabriel');
    await fsPromises.writeFile(filePathTMP(name), buffer);
    await minifyImage(filePathTMP(name));
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = generateAvatars;
