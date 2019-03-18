const gulp = require('gulp');
const sass = require('gulp-sass');
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const webserver = require('gulp-webserver');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean-css');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
//启动服务
gulp.task('webserver', function() {
        return gulp.src('./src1')
            .pipe(webserver({
                port: 9090,
                livereload: true,
                open: true
            }))
    })
    //scss
gulp.task('scss', function() {
    return gulp.src('./src1/scss/*.scss')
        .pipe(sass())
        /* .pipe(autoprefixer({
                browsers: ['auto 2 version']
            })) */
        .pipe(clean())
        .pipe(gulp.dest('./src1/scss'))
})

//js
gulp.task('js', function() {
        return gulp.src('./src1/js/*.js')
            .pipe(babel({
                presets: "es2015"
            }))
            .pipe(concat('all.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./src1/js'))
    })
    //watch
gulp.task('watch', function() {
    gulp.watch(['./src1/scss/*.scss', './src1/js/*.js'], gulp.series('scss', 'js'))

})
gulp.task('default', gulp.series('webserver', 'js', 'scss', 'watch'))