var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var concatVendor = require('gulp-concat-vendor');

var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');

var sources = [
	'app/app.module.js',
	'app/components/place/place.module.js',
	'app/components/company/company.module.js',
	'app/components/employee/employee.module.js',
	'app/shared/shared.module.js',
	'app/shared/i18n/i18n.module.js',
	'app/components/place/place-modal/place-modal.module.js',
	'app/**/*.js'
];

var insertLines = require('gulp-insert-lines');
var deleteLines = require('gulp-delete-lines');

gulp.task('vendor-scripts', function() {
	gulp.src('assets/js/*')
		.pipe(concatVendor('vendor.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/assets/js'));
});

gulp.task('scripts', function() {
	gulp.src(sources)
		.pipe(concat('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/assets/js'));
});

gulp.task('production', ['vendor-scripts', 'scripts', 'minCss'], function() {
	gulp.src(['!app/**/*.js', 'app/**/*']).pipe(gulp.dest('dist/app'));
	gulp.src(['!assets/js/**/*', '!assets/css/**/*', '!assets/sass/**/*', 'assets/**/*']).pipe(gulp.dest('dist/assets'));
	
	gulp.src("index.html")
		.pipe(deleteLines({
      		'filters': [
      			/<script\s+src=/i
  			]
    	}))
  		.pipe(insertLines({
      		'before': /<\/body>$/,
	      	'lineBefore': '<script type="text/javascript" src="assets/js/vendor.min.js"></script>\n' + 
	      				  '<script type="text/javascript" src="assets/js/all.min.js"></script>'
	    }))
	    //
	    .pipe(deleteLines({
      		'filters': [
      			/<link\s+href=/i
  			]
    	}))
  		.pipe(insertLines({
      		'before': /<\/title>$/,
	      	'lineBefore': '<link href="assets/css/all.min.css" rel="stylesheet">'
	    }))
	    .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
    gulp.src('assets/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('assets/css'));
});

gulp.task('minCss', ['sass'], function() {
	gulp.src('assets/css/**/*.css')
		.pipe(concatCss("all.min.css"))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('lint', function() {
    gulp.src('app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
	gulp.watch('app/**/*.js', ['lint']);
});

gulp.task('default', ['lint', 'watch']);