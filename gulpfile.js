const { src, dest, watch, parallel, series, task } = require("gulp");
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
      grid: 'autoplace',
      cascade: false
    })
  ]))
  .pipe(postcss([cssdeclsort({ order: 'alphabetically'})]))
  .pipe(dest(dir.src + "css"))

const bs_init = (done) =>
  browsersSync.init({
    server: {
      baseDir: dir.src,
      index: "index.html"
    }
  })


function bs_reload(done) {
  browsersSync.reload();
  done();
}

const watchSassFiles = () => watch(watch_reload, series(compileSass, bs_reload));

// // npx gulpというコマンドを実行した時、watchSassFilesが実行されるようにします
exports.default = series(parallel(bs_init, watchSassFiles));

