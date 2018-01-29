require('babel-core/register')({
    presets: [['es2015']],
});

const requireDir = require('require-dir');
requireDir('./gulp/tasks', { recurse: true });
