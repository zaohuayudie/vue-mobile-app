// require('./check-versions')()
process.noDeprecation = true
const wpConfig = require('../config/index')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(wpConfig.env.NODE_ENV)
}

const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = process.env.NODE_ENV === 'test'
  ? require('../config/webpack/prod.conf')
  : require('../config/webpack/dev.conf');

// default port where dev server listens for incoming traffic
const port = process.env.PORT || wpConfig.dev.port
// automatically open browser, if not set will be false
const autoOpenBrowser = !!wpConfig.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = wpConfig.dev.proxyTable

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {
  }
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
const staticPath = path.posix.join(wpConfig.dev.assetsPublicPath, wpConfig.dev.assetsSubDirectory)
app.use('/', express.static(process.cwd() + '/public'))
app.use('/', express.static(staticPath))

const uri = 'http://localhost:' + port

let _resolve
let readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV === 'development') {
    opn(uri)
  }
  _resolve()
})

//  '10.254.124.167',
const server = app.listen(port, function () {

})

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
