var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify       = require('gulp-uglify'),
    rename       = require('gulp-rename'),
    concat       = require('gulp-concat'),
    sass         = require('gulp-sass'),
    plumber      = require('gulp-plumber'),
    notify       = require('gulp-notify'),
    streamqueue  = require('streamqueue'),
    sourcemaps   = require('gulp-sourcemaps'),
    merge        = require('merge-stream'),
    babel        = require('gulp-babel');


// define the default task and add the watch task to it
gulp.task('default', ['watch']);

gulp.task('styles', function () {

    gulp.task('styles', function () {
        return gulp.src('./demo/sass/style.scss')
            .pipe(plumber({
                errorHandler: notify.onError("Error: <%= error.message %>")
            }))
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['last 5 versions'],
                cascade: false
            }))
            .pipe(sourcemaps.write('/'))
            .pipe(gulp.dest('./demo'))
            .pipe(notify("Styles task complete"));
    });

});

gulp.task('plugin_styles', function () {

    gulp.task('plugin_styles', function () {
        return gulp.src('./src/lem_gmaps.scss')
            .pipe(plumber({
                errorHandler: notify.onError("Error: <%= error.message %>")
            }))
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['last 5 versions'],
                cascade: false
            }))
            .pipe(sourcemaps.write('/'))
            .pipe(gulp.dest('./build'))
            .pipe(notify("Plugin styles task complete"));
    });

});


gulp.task('scripts', function() {
    return streamqueue({ objectMode: true },
        gulp.src('./src/lem_gmaps.es6')
    )

        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))

        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))

        .pipe(gulp.dest('./build'))

        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build'))
        .pipe(notify("Custom script task complete"))
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', ['styles', 'scripts', 'plugin_styles'], function() {
    gulp.watch('demo/sass/**/*.scss', ['styles']);
    gulp.watch('src/lem_gmaps.es6', ['scripts']);
    gulp.watch('src/lem_gmaps.scss', ['plugin_styles']);
});