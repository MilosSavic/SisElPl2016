// Karma configuration
// Generated on Wed Jan 25 2017 18:55:40 GMT+0100 (Central Europe Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'assets/js/angular/angular.js',
        'assets/js/angular-mocks/angular-mocks.js',
        "assets/js/angular-resource/angular-resource.js",
        "assets/js/angular-ui-router/release/angular-ui-router.js",
        "assets/js/angular-translate/angular-translate.js",
        "assets/js/angular-bootstrap/ui-bootstrap.js",
        "assets/js/angular-bootstrap/ui-bootstrap-tpls.js",
        "assets/js/angular-animate/angular-animate.js",
        "assets/js/angular-messages/angular-messages.js",
        'app/app.module.js',
        "app/components/amount/amount.module.js",
        "app/components/car-insurance/car-insurance.module.js",
        "app/components/car-insurance-service/car-insurance-service.module.js",
        "app/components/core/core.module.js",
        "app/components/house-insurance/house-insurance.module.js",
        "app/components/house-insurance-category/house-insurance-category.module.js",
        "app/components/insurance/insurance.module.js",
        "app/components/region/region.module.js",
        "app/components/sport/sport.module.js",
        "app/components/users/user.module.js",
        "app/components/employee/employee.module.js",
        "app/shared/shared.module.js",
        "app/shared/i18n/i18n.module.js",
        'app/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
