/*eslint-disable */

const NODE_ENV = process.env.NODE_ENV || 'development',
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  extractSASS = new ExtractTextPlugin('./css/[name].css'),
  extractCSS = new ExtractTextPlugin('./css/[name].css'),
  OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin')

const needToWatchChanges = NODE_ENV !== 'production' && NODE_ENV !== 'demo'
const codeCompression = NODE_ENV === 'production' || NODE_ENV === 'demo'
const mode = NODE_ENV === 'production' && 'production' || 'development'

const path = require('path')

// минимизируем css для production
// const CSS_LOADER_NAME = (NODE_ENV === 'production') ? 'css?minimize' : 'css?-minimize';

module.exports = {
  mode,
  watch: needToWatchChanges,
  watchOptions: {
    aggregateTimeout: 100,
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
    }),
    extractCSS,
    extractSASS,
    new CopyWebpackPlugin([
      { from: './static' }
    ])
  ],
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],

  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.mst$/,
        use: [
          {
            loader: 'mustache-loader',
            options: {
              noShortcut: true,
            },
          }
        ],
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {},
          }
        ],
      },
      {
        test: /\.css$/,
        loader: extractCSS.extract({ use: ['css-loader', 'style-loader'] }),
      },
      {
        test: /\.scss$/,
        loader: extractSASS.extract({ fallback: 'style-loader', use: ['css-loader', 'sass-loader'] }),
      },
      {
        test: /\.(png|jpg)$/,
        // options.name указывает путь, куда будут скопированы файлы, путь относительно output.path конфигурации webpack,
        //            помимо этого, этот параметр задает строку замены пути в файлах css
        // options.regExp задает регулярное выражение по которому будут подбираться файлы, анализ параметра url
        // options.limit задает лимит размера файлов, которые могут быть вставлены как Base64 строка, если размер файла будет превышать это
        //             значение он будет скопирован в директорию
        loader: 'url-loader',
        options: {
          name: '../img/[name].[ext]',
          regExp: 'Resources/img/(.*)',
          limit: '1248',
        },
      },
      {
        test: /\.svg/,
        use: {
          // loader: 'raw-loader'
          loader: 'svg-url-loader',
          options: {
            name: '../img/[name].[ext]',
            regExp: 'resources/img/(.*)',
            limit: '1248',
          },
        }
      }
    ],
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

}

if (codeCompression) {
  // плагин сжатия js исходников
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true,
        screw_ie8: false,
      },
      mangle: {
        screw_ie8: false,
        except: ['name', 'super', '$super', '$uper'],
      },
      mangleProperties: {
        screw_ie8: false,
        except: ['name', 'super', '$super', '$uper'],
      },
      output: {
        screw_ie8: false,
      },
    }))

  // добавляем плагин сжатия css файлов
  module.exports.plugins.push(new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.min\.css$/,
    cssProcessorOptions: {
      discardComments: {
        removeAll: true,
      },
    },
  }))
}

/*
 conversation about ie8 capability https://phabricator.babeljs.io/T2817
 */

/*eslint-enable */
