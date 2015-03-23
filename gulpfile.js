var gulp = require( 'gulp' ),
    logwarn = require( 'gulp-logwarn' ),
    jshint = require( 'gulp-jshint' ),
    jscs = require( 'gulp-jscs' ),
    mocha = require( 'gulp-mocha-phantomjs' );

gulp.task( 'jscs', function scriptsJSCSTask() {
    'use strict';

    return gulp.src( './floatingLabel.js' )
        .pipe( jscs());
});

gulp.task( 'jshint', function scriptsJSHintTask() {
    'use strict';

    return gulp.src( './floatingLabel.js' )
        .pipe( jshint())
        .pipe( jshint.reporter( 'default' ))
        .pipe( jshint.reporter( 'fail' ));
});

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

gulp.task( 'default', [ 'jscs', 'jshint', 'logwarn', 'mocha' ]);

gulp.task( 'test', [ 'jscs', 'jshint', 'logwarn', 'mocha' ]);
