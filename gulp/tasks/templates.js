import gulp from 'gulp';
import pkg from '../../package.json';

const templates = () => {
    return gulp
        .src([`${pkg.src.markup}**/*.*`])
        .pipe(gulp.dest(pkg.dist.markup));
};

gulp.task('compile:templates', templates);
module.exports = templates;
