/**
 * Created by antianlu on 2017/10/27.
 */
module.exports = {
  "button": [
    {
      "type": "click",
      "name": "今日歌曲",
      "key": "V1001_TODAY_MUSIC"
    },
    {
      "name": "菜单",
      "sub_button": [
        {
          "type": "view",
          "name": "Test",
          "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfd7295edd3e6b329&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect"
        },
        {
          "type": "miniprogram",
          "name": "wxa",
          "url": "http://mp.weixin.qq.com",
          "appid": "wx286b93c14bbf93aa",
          "pagepath": "pages/lunar/index"
        },
        {
          "type": "click",
          "name": "赞一下我们",
          "key": "V1001_GOOD"
        }]
    }]
}
