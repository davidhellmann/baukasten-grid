import postcss from 'gulp-postcss';
import gulp from 'gulp';
import pkg from '../../package.json';
import postCssNano from '../lib/postCssNano';

const minifyCss = () => {
    return gulp.src(`${pkg.dist.css}*.min.css`)
        .pipe(postcss(postCssNano()))
        .pipe(gulp.dest(pkg.dist.css));
};

gulp.task('minify:sass', minifyCss);
module.exports = minifyCss;
