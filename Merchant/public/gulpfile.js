var _ = require('lodash');
var gulp = require('gulp');
var rename = require('gulp-rename');
var insertLines = require('gulp-insert-lines');
var deleteLines = require('gulp-delete-lines');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var concatVendor = require('gulp-concat-vendor');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var bowerResolve = require('bower-resolve');
var nodeResolve = require('resolve');

gulp.task('vendor-scripts', function() {
	gulp.src([  'assets/js/jquery',
				'assets/js/angular',
				'assets/js/angular-resource',
				'assets/js/angular-ui-router',
				'assets/js/angular-translate',
				'assets/js/angular-bootstrap',
				'assets/js/angular-animate',
				'assets/js/angular-messages',
				'assets/js/angular-material',
				'assets/js/angular-aria',
				'assets/js/angular-dropdown-multiselect',
				'assets/js/angular-mocks',
				'./assets/js/bz-slider/bz-slider.js',
				'./assets/scripts/00-directive.js',
			 	'./assets/scripts/02-facebook.js',
				'./assets/scripts/03-twitter.js',
				'./assets/scripts/04-google-plus.js',
				'./assets/scripts/05-vk.js',
				'./assets/scripts/09-github.js'])
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
				'app/components/core/social.controller.js',
				'app/components/core/slider.controller.js',
				'app/components/core/data-page.controller.js',
				'app/components/core/rules.service.js',
				'app/components/core/acquirer.service.js',
				'app/components/core/merchant-data.service.js',
				'app/components/insurance/insurance.module.js',
				'app/components/insurance/insurance.routes.js',
				'app/components/insurance/insurance.service.js',
				'app/components/insurance/insurance.controller.js',
				'app/components/insurance/failed.controller.js',
				'app/components/insurance/error.controller.js',
				'app/components/insurance/success.controller.js',
				'app/components/insurance/email.service.js',
				'app/components/house-insurance/house-insurance.module.js',
				'app/components/house-insurance/house-insurance.routes.js',
				'app/components/house-insurance/house-insurance.service.js',
				'app/components/house-insurance/house-insurance.controller.js',
				'app/components/house-insurance-category/house-insurance-category.module.js',
				'app/components/house-insurance-category/house-insurance-category.routes.js',
				'app/components/house-insurance-category/house-insurance-category.service.js',
				'app/components/house-insurance-category/house-insurance-category.controller.js',
				'app/components/car-insurance/car-insurance.module.js',
				'app/components/car-insurance/car-insurance.routes.js',
				'app/components/car-insurance/car-insurance.service.js',
				'app/components/car-insurance/car-insurance.controller.js',
				'app/components/car-insurance-service/car-insurance-service.module.js',
				'app/components/car-insurance-service/car-insurance-service.routes.js',
				'app/components/car-insurance-service/car-insurance-service.service.js',
				'app/components/car-insurance-service/car-insurance-service.controller.js',
				'app/components/users/user.module.js',
				'app/components/users/users.routes.js',
				'app/components/users/users.controller.js',
				'app/components/users/user.service.js',
				'app/components/region/region.module.js',
				'app/components/region/region.routes.js',
				'app/components/region/region.controller.js',
				'app/components/region/region.service.js',
				'app/components/sport/sport.module.js',
				'app/components/sport/sport.service.js',
				'app/components/sport/sport.routes.js',
				'app/components/sport/sport.controller.js',
				'app/components/amount/amount.module.js',
				'app/components/amount/amount.routes.js',
				'app/components/amount/amount.controller.js',
				'app/components/amount/amount.service.js',
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
	    .pipe(gulp.dest('dist'));
});

function getBowerPackageIds() {
  var bowerManifest = {};
  try {
    bowerManifest = require('./bower.json');
  } catch (e) {
  }
  return _.keys(bowerManifest.dependencies) || [];
}


function getNPMPackageIds() {
  var packageManifest = {};
  try {
    packageManifest = require('./package.json');
  } catch (e) {
  }
  return _.keys(packageManifest.dependencies) || [];
}