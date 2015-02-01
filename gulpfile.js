var gulp        = require('gulp'),
    order       = require('gulp-order'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename');

gulp.task('uglify', function() {
    return gulp.src(['js/**/*.js'])
      .pipe(order([
        "vendor/*.js",
        "custom.js"
      ]))
        .pipe(concat('fedsonslack'))
        .pipe(uglify())
        .pipe(rename({
            extname: ".min.js"
         }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('build', ['uglify']);