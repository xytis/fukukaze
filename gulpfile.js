"use strict";

var gulp = require("gulp");
var usemin = require("gulp-usemin");
var uglify = require("gulp-uglify");
var minifyCss = require("gulp-minify-css");

gulp.task("default", function() {
   gulp.src("src/templates/layout.src.tpl")
        .pipe(usemin({
                    assetsDir: "public",
                    css: [minifyCss(), "concat"],
                    js: [uglify(), "concat"]
                }))
        .pipe(gulp.dest("public"));
});

gulp.task("watch", ["default"], function() {
    var watchFiles = [
            "src/templates/layout.src.tpl",
            "public/bower_components/*/dist/js/*.js",
            "!public/bower_components/*/dist/js/*.min.js",
            "public/bower_components/*/dist/*.js",
            "public/bower_components/*/dist/css/*.css",
            "!public/bower_components/*/dist/css/*.min.css",
            "public/bower_components/*/dist/font/*"
        ];

    gulp.watch(watchFiles, ["default"]);
});
