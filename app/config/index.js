/**
 * Created by antianlu on 2017/5/6.
 */
const path = require('path')
const fs = require('fs')
// source app root
const appRoot = path.join(__dirname, '..')
// project root
const root = path.join(appRoot, '..')

const env = process.env.NODE_ENV || 'development'

const isDevelopment = env === 'development'
const isProduction = !isDevelopment

const conf = {
  api: {
    host: '127.0.0.1:5001'
  }
}

let config = require('../../config')

if (!config.api) {
  config = conf
}

module.exports = {
  title: 'XS',
  API_PREFIX: config.API_PREFIX || '/api/v1',
  env: {
    NODE_ENV: JSON.stringify(env),
    DEBUG_MODE: JSON.stringify(isDevelopment),
    PUBLIC_URL: '/'
  },
  root: appRoot,
  source: path.join(appRoot, 'src'),
  assets: 'assets',
  // 编译目录配置
  build: {
    env: JSON.stringify(env),
    assetsRoot: path.resolve(root, 'public/h5/dist'),
    assetsSubDirectory: 'statics',
    assetsPublicPath: '/h5/dist/',
    productionSourceMap: false,
    index: path.resolve(root, 'public/h5/dist/index.html'),
    template: path.join(appRoot, 'src', 'template/index.ejs'),
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: JSON.stringify('development'),
    port: 8089,
    assetsSubDirectory: 'statics',
    assetsPublicPath: '/',
    index: 'index.html',
    template: path.join(appRoot, 'src', 'template/index.ejs'),
    proxyTable: {
      'api': {
        target: config.api.host,
        filter: function (pathname, req) {
          return /\/api\/v1\//.test(pathname);
        },
        changeOrigin: true,
        secure: false,
        logLevel: 'error'
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
    autoOpenBrowser: true
  },
  gzip: {
    enable: true,
    extensions: ['js', 'css', 'ttf', 'woff', 'svg']
  },
  sourceMap: {
    js: true,
    css: true
  },
  enableBundleAnalyzer: process.env.npm_config_report,
  isDevelopment: isDevelopment,
  isProduction: isProduction
}
