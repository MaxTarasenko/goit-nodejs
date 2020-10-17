const fs = require('fs');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');

// Image Compression
const minifyImage = async filepath => {
  try {
    await imagemin([filepath], {
      destination: 'public/avatars',
      plugins: [imageminJpegtran()],
    });
    fs.unlink(filepath, () => {});
  } catch (err) {
    console.log(err);
  }
};

module.exports = minifyImage;
