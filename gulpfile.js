var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var htmlreplace = require('gulp-html-replace');

var path = {
    HTML: 'src/index.html',
    ALL: ['src/js/*.js', 'src/js/**/*.js', 'src/index.html'],
    SASS: ['src/sass/*.scss'],
    JS: ['src/js/*.js', 'src/js/**/*.js'],
    MINIFIED_OUT: 'build.min.js',
    DEST_SRC: 'public/src',
    DEST_BUILD: 'public/build',
    DEST: 'public'
};

// generate css
gulp.task('sass', function() {
    gulp.src(path.SASS)
        .pipe(sass())
        .pipe(gulp.dest(path.DEST_SRC + '/css'));
});

// trasform react(jsx) to js
gulp.task('transform', function() {
    gulp.src(path.JS)
        .pipe(react())
        .pipe(gulp.dest(path.DEST_SRC + '/js'));
});

// copy index.html file
gulp.task('copy', function() {
    gulp.src(path.HTML)
        .pipe(gulp.dest(path.DEST));
});

// uglyfy js
gulp.task('scripts', function() {
    gulp.src([
            path.DEST_SRC + '/js/enum.js',
            path.DEST_SRC + '/js/Header.js',
            path.DEST_SRC + '/js/PLAINTEXT.js',
            path.DEST_SRC + '/js/HTMLCODE.js',
            path.DEST_SRC + '/js/COLUMN.js',
            path.DEST_SRC + '/js/TITLE.js',
            path.DEST_SRC + '/js/SINGLE.js',
            path.DEST_SRC + '/js/COUPLE.js',
            path.DEST_SRC + '/js/CATEGORIES.js',
            path.DEST_SRC + '/js/BodyFooter.js',
            path.DEST_SRC + '/js/Footer.js',
            path.DEST_SRC + '/js/builder/Builder.js',
            path.DEST_SRC + '/js/builder/ContextMenu.js',
            path.DEST_SRC + '/js/Newsletter.js',
            path.DEST_SRC + '/js/App.js'
        ])
        .pipe(react())
        .pipe(concat(path.MINIFIED_OUT))
        .pipe(uglify(path.MINIFIED_OUT))
        .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('replaceHTML', function() {
    gulp.src(path.HTML)
        .pipe(htmlreplace({
            'js': 'build/' + path.MINIFIED_OUT
        }))
        .pipe(gulp.dest(path.DEST));
});

gulp.task('production', ['scripts', 'sass', 'replaceHTML']);
gulp.task('development', ['transform', 'sass', 'copy']);

gulp.task('watch', function() {
    gulp.watch(path.SASS, ['sass']);
    gulp.watch(path.ALL, ['transform', 'copy']);
});

// change to production to deploy | development to dev
gulp.task('default', ['production'], function() {
    gulp.start('watch');
});