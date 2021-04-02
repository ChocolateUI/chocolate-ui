/**
 * @name gulpfile.js
 * @description 打包项目css依赖
 */

 const path = require("path");
 const gulp = require("gulp");
 const scss = require("gulp-scss");
 const autoprefixer = require("gulp-autoprefixer");
 const cssnano = require("gulp-cssnano");
 const size = require("gulp-filesize");
 const sourcemaps = require("gulp-sourcemaps");
 const browserList = [
   "last 2 versions",
   "Android >= 4.0",
   "Firefox ESR",
   "not ie < 9"
 ];
 
 const DIR = {
   less: path.resolve(__dirname, "../src/**/*.scss"),
   buildSrc: [
     path.resolve(__dirname, "../src/styles/**/styles.scss"),
     path.resolve(__dirname, "../src/styles/**/index.scss")
   ],
   dist: path.resolve(__dirname, "../dist")
 };
 
 gulp.task("copyScss", () => {
   console.log(DIR.less);
   return gulp
     .src(DIR.less)
     .pipe(gulp.dest(DIR.dist))
 });
 
 gulp.task("copyCss", () => {
   return gulp
     .src(DIR.buildSrc)
     .pipe(sourcemaps.init())
     .pipe(
       scss({
         outputStyle: "compressed"
       }).on('error', scss.logError)
     )
     .pipe(autoprefixer({ browsers: browserList }))
     .pipe(size())
     .pipe(cssnano())
     .pipe(gulp.dest(DIR.dist))
 });
 
 gulp.task('default', gulp.series('copyScss'));
 