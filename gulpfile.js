const gulp = require("gulp");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const terser = require("gulp-terser");
const imageMin = require("gulp-imagemin");

// Copy third party tools from /node_modules to /public/vendor
gulp.task("vendor", () => {
  // jQuery
  gulp
    .src([
      "./node_modules/jquery/dist/*",
      "!./node_modules/jquery/dist/core.js"
    ])
    .pipe(gulp.dest("./public/vendor/jquery"));

  // Bootstrap
  gulp
    .src([
      "./node_modules/bootstrap/dist/**/*"
      // "!./node_modules/bootstrap/dist/css/bootstrap-grid*",
      // "!./node_modules/bootstrap/dist/css/bootstrap-reboot*"
    ])
    .pipe(gulp.dest("./public/vendor/bootstrap"));
});

// Compile SCSS
gulp.task("css:compile", () => {
  return gulp
    .src("./public/stylesheets/sass/**/*.scss")
    .pipe(
      sass
        .sync({
          outputStyle: "expanded"
        })
        .on("error", sass.logError)
    )
    .pipe(gulp.dest("./public/stylesheets/css"));
});

// Minify CSS
gulp.task("css:minify", ["css:compile"], () => {
  return gulp
    .src([
      "./public/stylesheets/css/*.css",
      "!./public/stylesheets/css/*.min.css"
    ])
    .pipe(cleanCSS())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(gulp.dest("./public/stylesheets/css"));
});

// CSS tasks
gulp.task("css", ["css:compile", "css:minify"]);

// Minify JS
gulp.task("js:minify", () => {
  return gulp
    .src(["./public/javascript/*.js", "!./public/javascript/*.min.js"])
    .pipe(terser())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .on("error", err => {
      gutil.log(gutil.colors.red("[Error]"), err.toString());
    })
    .pipe(gulp.dest("./public/javascript"));
});

// JS task
gulp.task("js", ["js:minify"]);

// Minify Images
gulp.task("img:minify", () => {
  return gulp
    .src(["./public/images/*.png", "!./public/images/*.min.png"])
    .pipe(imageMin())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .on("error", err => {
      gutil.log(gutil.colors.red("[Error]"), err.toString());
    })
    .pipe(gulp.dest("./public/images"));
});

// Images task
gulp.task("img", ["img:minify"]);

// Default task
gulp.task("default", ["vendor", "css", "js", "img"]);

// Dev Task
gulp.task("dev", ["css", "js", "img"], () => {
  gulp.watch("./public/stylesheets/sass/*.scss", ["css"]);
  gulp.watch("./public/javascript/*.js", ["js"]);
  gulp.watch("./public/images/*", ["img"]);
});
