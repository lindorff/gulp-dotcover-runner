'use strict';

var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	filter = require('gulp-filter'),
    mocha = require('gulp-mocha');

var TESTS_PATTERN = 'tests/*.js';

gulp.task('default', [ 'test' ]);

gulp.task('lint', function () {
    return gulp.src('**/*.js')
        .pipe(filter([ '*', '!node_modules/**/*' ]))
        .pipe(jshint({ node: true }))
        .pipe(jshint.reporter('default'));
});

gulp.task('test', [ 'lint' ], function() {
    gulp.src(TESTS_PATTERN, { read: false })
        .pipe(mocha({
            reporter: 'spec',
            ui: 'bdd'
        }));
});

gulp.task('watch', function () {
	gulp.watch(TESTS_PATTERN, [ 'test' ]);
});
