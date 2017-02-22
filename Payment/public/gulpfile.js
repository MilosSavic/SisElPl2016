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
	gulp.src([  'assets/js/jquery',
				'assets/js/angular',
				'assets/js/angular-resource',
				'assets/js/angular-ui-router',
				'assets/js/angular-translate',
				'assets/js/angular-bootstrap',
				'assets/js/angular-animate',
				'assets/js/angular-messages',
				'assets/js/angular-mocks',
				'./assets/js/bz-slider/bz-slider.js'])
		.pipe(concatVendor('vendor.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/assets/js'));
});

gulp.task('scripts', function() {
	gulp.src([ 	'app/app.module.js',
				'app/shared/shared.module.js',
				'app/shared/directives/unique-field.directive.js',
				'app/shared/directives/busy-indicator.directive.js',
				'app/shared/directives/tooltip.directive.js',
				'app/components/core/core.module.js',
				'app/components/core/core.route.js',
				'app/components/core/side-bar.controller.js',
				'app/components/core/side-bar.service.js',
				'app/components/core/header.controller.js',
				'app/components/core/slider.controller.js',
				'app/components/payment/payment.module.js',
				'app/components/payment/payment.routes.js',
				'app/components/payment/payment.service.js',
				'app/components/payment/payment.controller.js',
				'app/shared/i18n/i18n.module.js',
				'app/shared/i18n/i18n.service.js',
				'app/shared/i18n/i18n.config.js',
				'app/shared/i18n/i18n-constants/i18n-constants.module.js',
				'app/shared/i18n/i18n-constants/i18n-constants.service.js'])
		.pipe(concat('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/assets/js'));
});

gulp.task('production', ['vendor-scripts', 'scripts'], function() {
	gulp.src(['!app/**/*.js', 'app/**/*']).pipe(gulp.dest('dist/app'));
	//gulp.src(['!assets/js/**/*', '!assets/css/**/*', '!assets/sass/**/*', 'assets/**/*']).pipe(gulp.dest('dist/assets'));
	gulp.src(['!assets/js/**/*', 'assets/**/*']).pipe(gulp.dest('dist/assets'));
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
	    /*
	    .pipe(deleteLines({
      		'filters': [
      			/<link\s+href=/i
  			]
    	}))
  		.pipe(insertLines({
      		'before': /<\/title>$/,
	      	'lineBefore': '<link href="assets/css/all.min.css" rel="stylesheet">'
	    }))*/
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