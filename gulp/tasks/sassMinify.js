import pkg from '../../package.json';
import postCssNano from '../lib/postCssNano';
import postcss from 'gulp-postcss';
import gulp from 'gulp';

const minifyCss = () => {
    return gulp.src(`${pkg.dist.css}*.min.css`)
        .pipe(postcss(postCssNano()))
        .pipe(gulp.dest(pkg.dist.css));
};

gulp.task('minify:sass', minifyCss);
module.exports = minifyCss;
