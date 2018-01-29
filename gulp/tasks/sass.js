import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import strip from 'gulp-strip-css-comments';
import cssbeauty from 'gulp-cssbeautify';
import csscomb from 'gulp-csscomb';
import browserSync from 'browser-sync';
import rename from 'gulp-rename';
import errorHandler from '../lib/errorHandler';
import pkg from '../../package.json';

const compileCss = () => {
    return gulp
        .src(`${pkg.src.css}**/*.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            precision: 10,
            includePaths: [`${pkg.src.css}**/*.scss`],
        }).on('error', errorHandler))
        .pipe(sourcemaps.write('./maps/'))
        .pipe(strip())
        .pipe(cssbeauty())
        .pipe(csscomb())
        .pipe(gulp.dest(pkg.dist.css))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(pkg.dist.css))
        .pipe(browserSync.stream({
            match: '**/*.css'
        })
        );
};

gulp.task('sass', compileCss);
module.exports = compileCss;
