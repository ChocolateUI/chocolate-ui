/**
 * @name gulpfile.js
 * @description 打包项目css依赖
 */

 const path = require("path");
 const gulp = require("gulp");
 const sass = require("gulp-sass");
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
   scss: path.resolve(__dirname, "../src/**/*.scss"),
   buildSrc: [
     path.resolve(__dirname, "../src/styles/**/index.scss"),
     path.resolve(__dirname, "../src/components/**/*.scss")
   ],
   dist: path.resolve(__dirname, "../dist"),
   css: path.resolve(__dirname, "../dist/components")
 };
 
 gulp.task("copyScss", () => {
   return gulp
     .src(DIR.scss)
     .pipe(gulp.dest(DIR.dist))
 });
 
 gulp.task("copyCss", () => {
   return gulp
     .src(DIR.buildSrc)
     .pipe(sourcemaps.init())
     .pipe(
       sass({
         outputStyle: "compressed"
       })
     )
     .pipe(autoprefixer({ browsers: browserList }))
     .pipe(size())
     .pipe(cssnano())
     .pipe(gulp.dest(DIR.css))
 });
 
 gulp.task('default', gulp.series('copyScss', 'copyCss'));
 