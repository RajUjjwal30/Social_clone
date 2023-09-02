//const gulp = import('gulp');
import gulp from 'gulp';
import gulpsass  from 'gulp-sass' ;
import nodeSass from 'node-sass';
const sass = gulpsass(nodeSass);
import cssnano from 'gulp-cssnano';
import rev from 'gulp-rev';
import gulpuglify from 'gulp-uglify-es';
const uglify = gulpuglify.default;


//in gulp we create tasks
gulp.task('css', function(done){
    console.log('minifying css..');
    //why /**/  ->  ster means every and each folder or files inside tis folder needs to be compressed
    gulp.src('./assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets/css'))
    // made a new folder 'public'. public ->assets>css/images/js
    //and in environment variables changed the ASSET_PATH to "./public/assets"

    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();


});