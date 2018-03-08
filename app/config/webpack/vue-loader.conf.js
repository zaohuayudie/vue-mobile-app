const utils = require('./utils')
const config = require('../index')

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: config.isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: config.isProduction
  }),
  postcss: [
    require('autoprefixer')({
      browsers: ['iOS >= 7', 'Android >= 4.1']
    }),
    // px2rem配置  设置值为37.5，这样750的设计稿量出多少px就写多少px就行。
    require('postcss-px2rem')({
      remUnit: 75
    })
  ]
}
