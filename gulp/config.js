'use strict';

export default {
  build: {
    css: './dist/css',
    js: './dist/js',
    jsMain: './dist/js/main.js',
  },

  source: {
    css: './app/css/**.css',
    jsMain: './app/js/app.jsx',
    scripts: './app/js/**/*.@(js|jsx)',
  },
};
