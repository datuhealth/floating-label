var gulp = require( 'gulp' ),
    logwarn = require( 'gulp-logwarn' ),
    mocha = require( 'gulp-mocha-phantomjs' );

gulp.task( 'logwarn', function scriptsLogwarnTask() {
    'use strict';

    return gulp.src( './floatingLabel.js' )
        .pipe( logwarn([
            'console.log',
            'console.error',
            'console.info',
            'debugger'
        ], {
            logLevel: 'warn'
        }));
});

gulp.task( 'mocha', function scriptsTestTask() {
    'use strict';

    return gulp.src( './test/index.html' )
        .pipe( mocha({
            phantomjs: {
                viewportSize: {
                    width: 1024,
                    height: 768
                }
            }
        }));
});

gulp.task( 'default', [ 'logwarn', 'mocha' ]);

gulp.task( 'test', [ 'logwarn', 'mocha' ]);
