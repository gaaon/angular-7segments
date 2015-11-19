const gulp_rename = {
    'gulp-util' : 'gutil',
    'gulp-angular-templatecache' : 'template'
}
,       gulp        = require('gulp')
,       $           = require('gulp-load-plugins')({rename: gulp_rename})
,       browserSync = require('browser-sync').create()
,       karma       = require('karma').Server
,       pkg         = require('./package.json');

var banner = ['/**'
,   ' * @name <%= pkg.name %>'
,   ' * @version v<%= pkg.version %>'
,   ' * @author <%= pkg.author.name %> <%= pkg.author.email %>'
,   ' * @license <%= pkg.license %>'
,   ' */'
,   ''
].join('\n');


/**
 * Concat source files in src folder into one plugin file.
 */
gulp.task('concat:source', ['template:source'], function(){
    return gulp.src(
        [
            'src/common/*.js',
            'src/**/!(public|template)*.js',
            'src/public.js',
            'src/template/template.js'
        ])
        .pipe($.insert.append('\n\n'))                  // insert spaces between source files
        .pipe($.concat('angular-7segments.js'))              // concat into one file
        .pipe($.ngAnnotate({add:true, remove:true}))    // for strict dependecy injection
        .pipe($.wrap('(function(window, angular)'       
                        +'{\n\n<%=contents%>}'          // wrap myPlugin.js for supporting
                    +')(window, window.angular);'))      // both amd and global
        .pipe(gulp.dest('./dist'));
});



/**
 * Append header to plugin file.
 */
gulp.task('header:source', ['concat:source'], function() {
    return gulp.src('./dist/angular-7segments.js')
        .pipe($.header(banner, {pkg: pkg}))     // append a header
        .pipe(gulp.dest('./'))
        .pipe($.copy('example/scripts'));       // copy for displaying examples
});



/**
 * Uglify the plugin file and also append header to it.
 */
gulp.task('uglify:source', ['concat:source'], function() {
    return gulp.src('./dist/angular-7segments.js')
        .pipe($.uglify())
        .pipe($.header(banner, {pkg: pkg}))
        .pipe($.rename({suffix: '.min'}))
        .pipe(gulp.dest('./'));
});



gulp.task('template:source', function(){
    return gulp.src('./src/template/*.html')
        .pipe($.htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
        }))
        .pipe($.template('template.js', {
            module: 'wo.7segments'
        }))
        .pipe($.insert.prepend('/*global angular*/\n'))
        .pipe(gulp.dest('./src/template'));
});


/**
 * Init a browser-sync with proxy and port.
 */
gulp.task('init:browserSync', function(){
    browserSync.init({
        proxy: 'localhost:8000',
        port: process.env.PORT      //replace this with a port which you want to use
    });
});



/**
 * webserver for examples
 */
gulp.task('webserver:example', ['init:browserSync'], function(){
    return gulp.src('example')
        .pipe($.webserver({
            host: 'localhost',
            path: '/example',
            port: '8000'
        }))
        .on('error', $.gutil.log);
});



/**
 * webserver for ngdocs
 */
gulp.task('webserver:ngdocs', ['init:browserSync'], function(){
    return gulp.src('docs')
        .pipe($.webserver({
            host: 'localhost',
            path: '/docs',
            port: '8000'
        }))
        .on('error', $.gutil.log);
});



/**
 * Watch source files and reload docs page when detects change
 */
gulp.task('watch:ngdocs', ['init:browserSync'], function(){
    gulp.watch(['src/**/*.js'], ['build', 'doc:ngdoc']);
    gulp.watch(['docs/index.html']).on('change', browserSync.reload);
});



/**
 * Generate docs templates with plugin source file
 */
gulp.task('build:ngdocs', ['build'], function(){
    return gulp.src('angular-7segments.js')
    .pipe($.ngdocs.process({
        html5Mode : false,
        scripts: [
            './angular-7segments.js'
        ]
    }))
    .pipe(gulp.dest('./docs'));
});



gulp.task('watch:example', ['browserSync:init'], function() {
    gulp.watch(['src/**/*.js'], ['build']).on('change', browserSync.reload);
    gulp.watch(['example/**/*.html']).on('change', browserSync.reload);
});


gulp.task('test', ['build'], function (done) {
    new karma({
        configFile: __dirname + '/karma.conf.js',
        browsers: ['PhantomJS'],
        singleRun: true
        }, function(){
            done();
        }
    ).start();
});


gulp.task('lint', function (){
    return gulp.src('./src/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'))
    .pipe($.jshint.reporter('fail'));
});



gulp.task('lint-nofail', function(){
    return gulp.src('./src/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
});


gulp.task('watch:source', ['lint-nofail', 'build'], function(){
    gulp.watch(['src/**/*.js'], ['lint-nofail', 'build']);
    gulp.watch(['src/template/*.html'], ['build']);
});


gulp.task('build', ['header:source', 'uglify:source']);

gulp.task('default', ['build', 'test', 'lint']);

gulp.task('ngdocs', ['build:ngdocs', 'watch:ngdocs', 'webserver:ngdocs']);