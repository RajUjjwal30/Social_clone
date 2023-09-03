//const gulp = import('gulp');
import gulp from 'gulp';
import gulpsass  from 'gulp-sass' ;
import nodeSass from 'node-sass';
const sass = gulpsass(nodeSass);
import cssnano from 'gulp-cssnano';
import rev from 'gulp-rev';
import gulpuglify from 'gulp-uglify-es';
const uglify = gulpuglify.default;


import imagemin from 'gulp-imagemin';
import {deleteSync} from 'del';





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

     gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();


});

gulp.task('js',function(done){
    console.log('minifying js...');
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
     done();
});

gulp.task('images', function(done){
    console.log('compressing images...');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

//empty the public/assets directory
//whenever u are building a project, you need to clear the previous build and build it from scratch
gulp.task('clean:assets', function(done){
    deleteSync('./public/assets');
    done();
});

gulp.task('build',gulp.series('clean:assets', 'css','js','images'), function(done){
    console.log('Building assets');
    done();
});