import gulp from 'gulp';
import runSequence from 'run-sequence';

const defaultTask = (cb) => {
    runSequence(
        ['clean:dist'],
        ['browser-sync', 'watch'],
        ['minify:sass'],
        cb
    );
};

gulp.task('default', defaultTask);
module.exports = defaultTask;
