import gulp from 'gulp';
import paths from '../config';

gulp.task('build:css', () => gulp.src([paths.source.css]).pipe(gulp.dest(paths.build.css)));
