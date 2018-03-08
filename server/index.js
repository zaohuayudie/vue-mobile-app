/**
 * Created by antianlu on 2017/10/27.
 */

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const httpProxy = require('http-proxy');
let proxy = httpProxy.createProxyServer({});

const routes = require('./routes');

const app = express();

global.config = require('../config')

let env = process.env.NODE_ENV || 'development'

let cwd = process.cwd()

if (env === 'development') {
  proxy.on('proxyReq', function (proxyReq, req, res, options) {
    proxyReq.setHeader('X-Special-Proxy-Header', '*');
  });
  app.use(function (req, res, next) {
    if (/\/api\/v1/.test(req.path)) {
      delete req.headers.host;
      proxy.web(req, res, {target: config.api.host});
    } else {
      next()
    }
  })
}

// uncomment after placing your favicon in /public
app.use(favicon(path.join(cwd, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(cwd, 'public')));

routes(app);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
