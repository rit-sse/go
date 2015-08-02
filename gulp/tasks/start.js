var gulp = require('gulp');
var startServer = require('../../bin/www');

gulp.task('start', ['build'], startServer);
