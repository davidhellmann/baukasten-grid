import config from '../../package.json';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

const minifyCss = () => {
    return gulp.src(`${config.dist.css}*.css`).pipe(gulp.dest(config.dist.css));
};

gulp.task('minify:sass', minifyCss);
module.exports = minifyCss;
