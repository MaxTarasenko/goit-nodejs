const fs = require('fs');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const { pathMinifyImage } = require('../config');

// Image Compression
const minifyImage = async filepath => {
  try {
    await imagemin([filepath], {
      destination: pathMinifyImage,
      plugins: [imageminJpegtran()],
    });
    fs.promises.unlink(filepath);
  } catch (err) {
    console.log(err);
  }
};

module.exports = minifyImage;
