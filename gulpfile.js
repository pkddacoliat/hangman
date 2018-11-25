const gulp = require("gulp");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");

// Copy third party tools from node_modules to /public/vendor
gulp.task("vendor", () => {
  return console.log("Task for node_modules here...");
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

// Default task
gulp.task("default", ["vendor", "css"]);
