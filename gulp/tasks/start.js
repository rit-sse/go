'use strict';

import gulp from 'gulp';
import startServer from '../../bin/www';

gulp.task('start', ['build'], startServer);
