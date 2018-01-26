import gulp from 'gulp';
import yargs from 'yargs';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import errorHandler from '../lib/errorHandler';
import pkg from '../../packacke.json';

const argv = yargs.argv;
const $ = gulpLoadPlugins();

const compileCss = () => {
    const env = argv.env || 'development';

    return gulp
        .src(`${pkg.src.css}**/*.scss`)
        .pipe(argv.source ? $.debug({ verbose: true }) : $.util.noop())
        .pipe(env === 'development' ? $.sourcemaps.init() : $.util.noop())
        .pipe($.rename({ suffix: '.min' }))
        .pipe(
            $.sass({
                precision: 10,
                includePaths: [`${pkg.src.css}**/*.scss`],
            }).on('error', errorHandler),
        )
        .pipe(
            env === 'development'
                ? $.sourcemaps.write('./maps/')
                : $.util.noop(),
        )
        .pipe(gulp.dest(pkg.dist.css))
        .pipe(
            $.size({
                title: '>>> CSS File Size: ',
            }),
        )
        .pipe(
            browserSync.stream({
                match: '**/*.css',
            }),
        );
};

gulp.task('sass', compileCss);
module.exports = compileCss;
