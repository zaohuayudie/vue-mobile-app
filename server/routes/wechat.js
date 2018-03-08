/**
 * Created by antianlu on 2017/10/27.
 */
const express = require('express');
const router = express.Router();
const nodeWeixinMenu = require('node-weixin-menu');
const settings = require('node-weixin-settings');
const weixinMenu = require('../../config/wechat-menu')

const nodeWeixinConfig = require("node-weixin-config");
nodeWeixinConfig.app.init(config.wechat);


module.exports = router;
nodeWeixinMenu.create(settings, config.wechat, weixinMenu, function (err, data) {
  //error === true
  //data.errcode === 0
  //data.errmsg === 'ok'
})

router.get('/server', function (req, res, next) {
  res.send('This is wechat page')
})

router.get('/config',function (req,res,next) {

})
