import gulp from 'gulp';
import pkg from '../../package.json';

const watchTask = () => {
    // watch templates
    gulp.watch(`${pkg.src.markup}**/*.{php,html,twig,rss}`, [
        'compile:templates',
    ]);

    gulp.watch(`${pkg.src.css}**/*.scss`, ['sass']);
};

gulp.task('watch', ['browser-sync'], watchTask);
module.exports = watchTask;
