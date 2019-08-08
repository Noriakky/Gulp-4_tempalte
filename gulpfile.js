const { src, dest, watch, parallel, series } = require("gulp");
//const gulp = require('gulp');
const sass = require("gulp-sass");
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sassGlob = require('gulp-sass-glob');
const browsersSync = require('browser-sync');
const postcss = require("gulp-postcss");
const autoprefixer = require('autoprefixer');
const cssdeclsort = require('css-declaration-sorter');
const dir = {
  src: 'htdocs/'
}

const watch_reload = [
  dir.src + 'scss/**/*.scss',
  dir.src + '**/*.html'
]

const compileSass = () => 
  src(dir.src + "scss/**/*.scss")
  .pipe(
    plumber({
      errorHandler: notify.onError(
        "Error: <%= error.message %>"
      )
    })
  )
  .pipe(
    sass({
      outputStyle: 'expanded'
    })
  )
  .pipe( postcss([
    autoprefixer({
      cascade: false
    })
  ]))
  .pipe(postcss([cssdeclsort({ order: 'alphabetically'})]))
  .pipe(gulp.dest(dir.src + "css"))


const watchSassFiles = () => watch(dir.src + "scss/**/*.scss", compileSass);
exports.default = watchSassFiles;

// gulp.task('sass', function(){
//   return gulp
//   .src(dir.src + "scss/**/*.scss")
//   .pipe(
//     plumber({
//       errorHandler: notify.onError(
//         "Error: <%= error.message %>"
//         )
//       })
//    )
// //  .pipe(sassGlob())
//   .pipe(
//     sass({
//       outputStyle: 'expanded'
//     })
//   )
//   .pipe( postcss([
//     autoprefixer({
//       cascade:false
//     })
//   ]) )
//   .pipe( postcss([ cssdeclsort({ order: 'alphabetically'})]))
//   .pipe(gulp.dest(dir.src + "css"))
// });
// gulp.task('bs-reload', function(done){
//   browsersSync.reload();
//   done();
// });

// gulp.task('browser-sync', function(done){
//   browsersSync.init({
//     server: {
//       baseDir: dir.src,
//       index: "index.html"
//     }
//   })
//   done();
// });

// 監視
// gulp.task('watch', function(done){
// gulp.watch(dir.src + 'scss/**/*.scss', gulp.task('sass'));
// gulp.watch(watch_reload, gulp.task('bs-reload'));
// });

// default
//gulp.task('default', gulp.series(gulp.parallel('browser-sync', 'watch')));

// const compileSass = () =>
//   // style.scssファイルを取得
//   src(dir.src + "scss/**/*.scss", gulp.series("postcss"))
//     // Sassのコンパイルを実行
//     .pipe(
//       // コンパイル後のCSSを展開
//       sass({
//         outputStyle: "expanded"
//       })
//     )
//     .pipe(postcss(plugin))
//     // cssフォルダー以下に保存
//     .pipe(dest("css"));
// const watchSassFiles = () => watch("css/style.scss", compileSass);
// // npx gulpというコマンドを実行した時、watchSassFilesが実行されるようにします
// exports.default = watchSassFiles;