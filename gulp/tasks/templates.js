import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import pkg from '../../package.json';

const $ = gulpLoadPlugins();

const templates = () => {
    return gulp
        .src([`${pkg.src.markup}**/*.*`])
        .pipe(
            global.checkChanged === true
                ? $.changed(pkg.dist.markup)
                : $.util.noop(),
        )
        .pipe(gulp.dest(pkg.dist.markup));
};

gulp.task('compile:templates', templates);
module.exports = templates;
