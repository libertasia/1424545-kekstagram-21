const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/data/backend.js",
    "./js/gallery/pictures.js",
    "./js/gallery/filter.js",
    "./js/gallery/preview.js",
    "./js/form/picture-size.js",
    "./js/form/upload-result.js",
    "./js/form/form.js",
    "./js/form/upload-img.js",
    "./js/form/slider.js",
    "./js/form/effects.js",
    "./js/form/valid.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
