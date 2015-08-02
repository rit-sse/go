var gulp = require('gulp');
var paths = require('../config');

gulp.task('default', ['start'], function(){
  gulp.watch(paths.source.scripts, ['build:scripts' ]);
  gulp.watch([paths.source.css], ['build:css']);
});
