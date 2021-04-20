/*eslint-disable */

const NODE_ENV = process.env.NODE_ENV || 'development'

const developmentSources = NODE_ENV !== 'production' && NODE_ENV !== 'demo' ? '#inline-source-map' : false

const baseConfig = require('./webpack.config.base')
const config = {
  ...baseConfig,
  ...{
    entry: {
      application: './application.js',
      background: './background.js',
      popup: './popup.js'
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
