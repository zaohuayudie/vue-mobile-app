const utils = require('./utils')
const webpack = require('webpack')
const wpConfig = require('../index')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./app/run/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({sourceMap: wpConfig.dev.cssSourceMap})
  },
  // cheap-module-eval-source-map is faster for development, but chrome doesn't stop at breakpoints
  // devtool: '#cheap-module-eval-source-map',
  devtool: '#source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"'
      }
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: wpConfig.dev.index,
      template: wpConfig.dev.template,
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
