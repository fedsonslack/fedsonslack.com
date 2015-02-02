var gulp         = require('gulp'),
    order        = require('gulp-order'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    minifyCSS    = require('gulp-minify-css'),
    serve        = require('gulp-serve'),
    liveReload   = require('gulp-livereload'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename       = require('gulp-rename');

gulp.task('uglify', function() {
    return gulp.src(['js/**/*.js'])
      .pipe(order([
        "vendor/*.js",
        "*.js"
      ]))
        .pipe(concat('fedsonslack'))
        .pipe(uglify())
        .pipe(rename({
            extname: ".min.js"
         }))
        .pipe(gulp.dest('dist/js'))
        .pipe(liveReload());
});

gulp.task('styles', function() {
  return gulp.src('sass/*.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(gulp.dest('css'))
});

gulp.task('minify-css', ['styles'], function(){
    return gulp.src('css/**/*.css')
        .pipe(order([
          "vendor/*.css",
          "*.css"
        ]))
        .pipe(concat('fedsonslack'))
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(rename({
            extname: ".min.css"
         }))
        .pipe(gulp.dest('dist/css'))
        .pipe(liveReload())
})
gulp.task('serve', serve({
    root: [__dirname],
    port: 3000
}));

gulp.task('watch', function() {
    liveReload.listen({start:true});

    gulp.watch(['sass/**/*.scss', 'css/**/*.css'] , ['minify-css']);
    gulp.watch('js/**/*.js',  ['uglify']);
    gulp.watch('index.html', liveReload)


});

gulp.task('build', ['uglify']);
gulp.task('default', ['minify-css','uglify', 'watch', 'serve']);