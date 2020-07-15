/*eslint-disable */

const NODE_ENV = process.env.NODE_ENV || 'development'

const developmentSources = NODE_ENV !== 'production' && NODE_ENV !== 'demo' ? '#inline-source-map' : false

const baseConfig = require('./webpack.config.base')
const config = {
  ...baseConfig,
  ...{
    entry: {
      // es5Shims: './Resources/src/js/lib/es5-shims/es5-shims.custom',
      // es6Shims: './Resources/src/js/lib/es6-shims/es6-shims',
      application: './on-page.js',
      background: './background.js'
    },
    devtool: developmentSources,
    output: {
      path: __dirname + '/resources/public',
      filename: '[name].js',
      chunkFilename: '[name]-[chunkhash].js',
      library: '[name]'
    }
  }
}

module.exports = config

/*eslint-enable */
