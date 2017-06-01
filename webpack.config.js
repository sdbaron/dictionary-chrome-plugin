/*eslint-disable */

const NODE_ENV = process.env.NODE_ENV || 'development',
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    extractSASS = new ExtractTextPlugin('./css/[name].css'),
    extractCSS = new ExtractTextPlugin('./css/[name].css'),
    autoprefixer = require('autoprefixer'),
    browserslist = require('browserslist'),
    OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

// минимизируем css для production
const CSS_LOADER_NAME = (NODE_ENV === 'production') ? 'css?minimize' : 'css?-minimize';

const needToWatchChanges = NODE_ENV !== 'production' && NODE_ENV !== 'demo';
const developmentSources = NODE_ENV !== 'production' && NODE_ENV !== 'demo' ? '#inline-source-map' : null;
const codeCompression = NODE_ENV === 'production' || NODE_ENV === 'demo';

module.exports = {
    entry: {
        // es5Shims: './Resources/src/js/lib/es5-shims/es5-shims.custom',
        // es6Shims: './Resources/src/js/lib/es6-shims/es6-shims',
        application: './on-page.js'
    },
    output: {
        path: __dirname + '/resources/public',
        filename: '[name].js',
        chunkFilename: '[name]-[chunkhash].js',
        library: '[name]'
    },
    watch: needToWatchChanges,
    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: developmentSources,

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        // далее определяем те переменные, которые хотим сделать доступными клиенту (в исходниках)
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        /*new webpack.optimize.CommonsChunkPlugin({
         name: 'commons',
         filename: './common.js'
         }),*/ /*
         new WebpackNotifierPlugin({
         title: 'Webpack',
         alwaysNotify: true
         }),*/
        extractCSS,
        extractSASS,
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, 'manifest.json'),
                to: path.join(__dirname, '/resources/public/manifest.json')
            },
            {
                from: path.join(__dirname, '*.html'),
                to: path.join(__dirname, '/resources/public/[name].[ext]')
            }
        ])
        // new HtmlWebpackPlugin({ title: 'Tree-shaking' })
    ],
    resolve: {
        modules: [
            path.join(__dirname, "src"),
            "node_modules"
        ],
        // modulesDirectories: ['node_modules'],
        extensions: ['.js', '.jsx'],

        // алиасы для import, чтобы не писать много точек в пути до модулей
        // alias: {
        //     // алиас папки с моделями
        //     Models: __dirname + '/Resources/src/js/data',
        //     //// алиас для моделей DesigningWorks
        //     //designingWorks: __dirname + '/Resources/js/data/designingWorks',
        //     // алиас для папки с контролами
        //     Controls: __dirname + '/App/Controls',
        //     // алиас для папки Resources (чаще всего отсюда нужен модуль ajax)
        //     Resources: __dirname + '/Resources',
        //     // алиас для модуля Ajax
        //     aAjax$: __dirname + '/Resources/src/js/ajax/ajax',
        // }
    },
    // resolveLoader: {
    //     modulesDirectories: ['node_modules'],
    //     // moduleTemplates: ['*-loader'],
    //     extensions: ['', '.js']
    // },
    module: {
        rules: [
            // сюда вставится es3ify в продакшн-версии
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['babel-loader']
            },
            {
                test: /\.mst$/,
                use: [{
                    loader: 'mustache-loader',
                    options: {
                        noShortcut: true
                    }
                }]
            },
            {
                test: /\.pug$/,
                use: [{
                    loader: 'pug-loader',
                    options: {}
                }]
            },
            {
                test: /\.css$/,
                loader: extractCSS.extract({use: ['css-loader', 'style-loader']})
            },
            {
                test: /\.scss$/,
                loader: extractSASS.extract({fallback: 'style-loader', use: ['css-loader', 'sass-loader']})
            },
            {
                test: /\.(png|jpg)$/,
                // query.name указывает путь куда будут скопированы файлы, путь относительно output.path конфигурации webpack,
                //            помимо этого, этот параметр задает строку замены пути в файлах css
                // query.regExp задает регулярное выражение по которому будут подбираться файлы, анализ параметра url
                // query.limit задает лимит размера файлов, которые могут быть вставлены как Base64 строка, если размер файла будет превышать это
                //             значение он будет скопирован в директорию
                loader: 'url-loader',
                query: {
                    name: '../img/[name].[ext]',
                    regExp: 'Resources/img/(.*)',
                    limit: '2048'
                }
            }
        ]
    },

    // модули и из настройки для загрузчика postcss
    // postcss: function () {
    //     return [
    //         // автоматически проставит вендорные префиксы
    //         autoprefixer({
    //             browsers: browserslist('ie < 12, Opera < 20, Firefox < 20, Chrome < 40,  Edge < 15')
    //         })
    //         // препроцессор ()
    //         // , require('precss')
    //     ];
    // }

};

if (codeCompression) {
    // плагин сжатия js исходников
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true,
                screw_ie8: false
            },
            mangle: {
                screw_ie8: false,
                except: ['name', 'super', '$super', '$uper']
            },
            mangleProperties: {
                screw_ie8: false,
                except: ['name', 'super', '$super', '$uper']
            },
            output: {
                screw_ie8: false
            }
        }));

    // добавляем плагин сжатия css файлов
    module.exports.plugins.push(new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.min\.css$/,
        cssProcessorOptions: {
            discardComments: {
                removeAll: true
            }
        }
    }));
}

/*
 conversation about ie8 capability https://phabricator.babeljs.io/T2817
 */

/*eslint-enable */