import gulp from 'gulp';
import runSequence from 'run-sequence';

const buildTask = (cb) => {
    runSequence(
        ['clean:templates', 'clean:css'],
        ['compile:templates', 'sass'],
        ['minify:sass'],
        cb
    );
};

gulp.task('build', buildTask);
module.exports = buildTask;
