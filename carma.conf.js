// Karma configuration
// Generated on Thu Jul 07 2016 16:46:36 GMT+0300 (RTZ 2 (зима))
//const RewireWebpackPlugin = require('rewire-webpack');

const webpackConfigBase = require('./webpack.config.base');
const webpackConfig = Object.assign(
    {},
    webpackConfigBase,
    {devtool: false}
);

const PATH_TO_SPEC_FILES_BASE = '/**/*[sS]pec.js';
const PATH_TO_SPEC_FILES = __dirname + '/dictionaries' + PATH_TO_SPEC_FILES_BASE;
const PATH_TO_SPEC_FILES_2 = __dirname + '/display' + PATH_TO_SPEC_FILES_BASE;

module.exports = function (config) {

    // preprocessors
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    // файлы пропустим через webpack

    // для js-файлов с тестами
    config.preprocessors[PATH_TO_SPEC_FILES] = ['webpack'];
    config.preprocessors[PATH_TO_SPEC_FILES_2] = ['webpack'];

    // для всех остальных js-files
    config.preprocessors['*.js'] = ['webpack'];

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        // basePath: 'spec',
        basePath: __dirname,

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            {pattern: PATH_TO_SPEC_FILES, watched: false},
            {pattern: PATH_TO_SPEC_FILES_2, watched: false}
        ],

        // list of files to exclude
        webpack: webpackConfig,

        webpackMiddleware: {
            stats: {
                colors: true
            }
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        // репортеры необходимы для  наглядного отображения результатов

        reporters: ['progress', /*'mocha', *//*'coverage'*/],
        /*,

         coverageReporter: {
         dir:'reports/coverage/',

         reporters: [
         { type:'html', subdir: 'report-html' },
         { type:'lcov', subdir: 'report-lcov' }
         ],

         instrumenterOptions: {
         istanbul: { noCompact:true }
         }
         }*/

        plugins: [
            'karma-chrome-launcher',
            'karma-opera-launcher',
            'karma-jasmine',
            'karma-mocha',
            'karma-coverage',
            'karma-webpack',
            'karma-mocha-reporter'
        ],

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
        browsers: ['Chrome'/*, 'Opera'*/],

        autoWatchBatchDelay: 300,


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });

};
