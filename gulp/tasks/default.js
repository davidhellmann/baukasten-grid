import gulp from 'gulp';
import runSequence from 'run-sequence';

const defaultTask = (cb) => {
    runSequence(
        ['build'],
        ['browser-sync', 'watch'],
        cb
    );
};

gulp.task('default', defaultTask);
module.exports = defaultTask;
