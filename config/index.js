/**
 * Created by antianlu on 2017/7/10.
 */

const env = process.env.NODE_ENV || 'development'

const config = require('./' + (env === 'development' ? 'local' : env))

module.exports = config;
