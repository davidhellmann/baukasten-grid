import gulp from 'gulp'
import del from 'del'
import pkg from '../../package.json'

// Clean Dist
gulp.task('clean:dist', (cb) => {
    return del([
        `${pkg.dist.markup}**/*`
    ], {
        force: true
    }, cb)
});

// Clean Templates
gulp.task('clean:templates', (cb) => {
    return del([
        `${pkg.dist.markup}**/*`
    ], {
        force: true
    }, cb)
});

// Clean CSS
gulp.task('clean:css', (cb) => {
    return del([
        `${pkg.dist.css}**/*`
    ], {
        force: true
    }, cb)
});
