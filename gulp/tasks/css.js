var gulp = require('gulp');
var paths = require('../config');

gulp.task('build:css', function(){
  gulp.src([paths.source.css])
    .pipe(gulp.dest(paths.build.css));
});
