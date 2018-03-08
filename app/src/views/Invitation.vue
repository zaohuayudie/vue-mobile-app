<template>
  <div class="invitation">
    <!--:left-options="{ showBack: false }"-->
    <x-header class="header" title="邀请抢好礼"/>
    <div class="main">
      <section class="logo">
        <div class="logo-content">
          <img src="../assets/images/banner.jpg" alt="logo"/>
        </div>
      </section>
      <section class="share">
        <div class="hd">
          <span class="line"></span>
          <span class="title">分享至</span>
          <span class="line"></span>
        </div>
        <ul class="bd">
          <li>
            <a @click="onShareFriend">
              <img src="../assets/images/wechat_friend.jpg" alt="friend"/>
            </a>
          </li>
          <li>
            <a @click="onShareMoment">
              <img src="../assets/images/wechat_moment.jpg" alt="moment"/>
            </a>
          </li>
        </ul>
      </section>
      <section class="rule">
        <h1 class="title">奖励规则</h1>
        <ul class="explanation">
          <li>1. 分享此页面给好友，邀请TA输入手机号领取，邀请越多，奖励越多。</li>
          <li>2. 邀请2个好友，并且好友完成体验卡支付，则赠送一张价值39元轻乳酪蛋糕兑换券。</li>
          <li>3. 邀请5个好友，并且好友完成体验卡支付，则赠送一张价值198元澳洲牛乳蛋糕兑换券。</li>
          <li>4. 好友领取15天内未注册领取体验卡，则优惠机会失效。</li>
          <li>5. 同一手机号、设备号、支付账号均视为同一用户，每个用户仅限购买使用一次体验卡。</li>
        </ul>
      </section>
      <section class="log">
        <div class="hd">
          <span class="line"></span>
          <span class="title">我的邀请记录</span>
          <span class="line"></span>
        </div>
        <ul class="status">
          <li>
            <span>已邀请{{invitaionTimes}}人</span>・<span>已付款{{paidTimes}}人</span>
          </li>
        </ul>
        <div class="list" v-for="log in logs">
          <div class="item">
            <div class="head">
              {{log.headUrl}}
            </div>
            <div class="user">
              <h5>{{log.name}}</h5>
              <div>{{log.status}}</div>
            </div>
            <div class="date">
              {{log.date}}
            </div>
          </div>
        </div>
      </section>
    </div>
    <footer class="footer">此次活动最终解释权归香送所有</footer>
  </div>
</template>
<style lang="less" scoped>
  .invitation {
    background-color: rgb(235, 235, 235);
  }

  .header, .main, .footer {
    background-color: #ffffff;
  }

  /* logo */
  .logo .logo-content img {
    height: 100%;
    width: 100%;
    border: none;
  }

  /* share */
  .share {
    margin: 8px 0;
    padding: 20px 0;
  }

  .share .hd {
    height: 50px;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    padding-top: 50px;
  }

  .share .hd .line {
    flex: 0 15%;
    height: 2px;
    background-color: #bbbbbb;
    display: block;
    margin-top: 23px;
  }

  .share .hd .title {
    flex: 0 20%;
    font-size: 28px;
    text-align: center;
  }

  .share .bd {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    list-style: none;
  }

  .share .bd li {
    flex: 0 18%;
    text-align: center;
  }

  .share .bd li img {
    height: 100%;
    width: 40px;
    border: none;
  }

  /* rule */
  .rule .title {
    font-size: 32px;
    text-align: center;
    padding: 10px 0;
  }

  .rule .explanation {
    padding: 10px 40px;
    margin: 0;
    font-size: 28px;
    list-style: none;
  }

  .rule .explanation li {
    padding: 5px 0;
  }

  /* log */
  .share {
    margin: 8px 0;
    padding: 20px 0;
  }

  .log .hd {
    height: 50px;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    padding-top: 50px;
  }

  .log .hd .line {
    flex: 0 15%;
    height: 2px;
    background-color: #bbbbbb;
    display: block;
    margin-top: 23px;
  }

  .log .hd .title {
    flex: 0 30%;
    font-size: 28px;
    text-align: center;
  }

  .log .status {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    list-style: none;
  }

  .log .status li {
    flex: 0 100%;
    text-align: center;
    font-size: 20px;
  }

  .log .list {
    font-size: 20px;
  }

  .log .list .item {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    padding: 16px 0;
  }

  .log .list .item .head {
    flex: 0 10%;
  }

  .log .list .item .user {
    flex: 0 15%;
  }

  .log .list .item .date {
    flex: 0 35%;
    margin-top: 30px;
  }

  /* footer */
  .footer {
    font-size: 20px;
    text-align: center;
    padding-top: 100px;
  }
</style>
<script>
  import {XHeader} from 'vux'
  import wx from 'weixin-js-sdk';
  import Services from '../services'
  const imgUrl = require('../assets/images/logo.png');
  export default {
    name: 'Invitation',
    data() {
      return {
        logs: [],
        data: {}
      };
      /*
       return {
       logs: [{
       name: '啊哈哈',
       status: 'Unpaid',
       createdAt: '2017-01-01 00:00:00',
       }, {
       name: '啊哈哈',
       status: 'paid',
       createdAt: '2017-01-01 00:00:00',
       }],
       }
       */
    },
    components: {
      XHeader,
    },
    computed: {
      invitaionTimes() {
        return this.logs.length;
      },
      paidTimes() {
        const {logs} = this;
        const paidUser = logs.filter((user) => user.status === 'paid');
        return paidUser.length;
      },
    },
    mounted() {
      this.wxInit();
      this.getShare();
    },
    methods: {
      showAlert (message) {
        this.$vux.alert.show({
          title: '提示',
          content: message || '未知错误',
          onShow () {
          },
          onHide () {
          }
        })
      },
      getShare() {
        const self = this;
        Services.share.getShare().then(({data}) => {
          self.logs = data;
        });
      },
      onShareFriend () {
        // test
        this.wxInit()
      },
      onShareMoment () {
        this.wxInit()
      },
      wxInit() {
        let url = document.location.href;
        Services.share.getConfig({url: url}).then(({data}) => {
//          this.$vux.alert.show({
//            title: '提示',
//            content: JSON.stringify(data),
//            onShow () {
//            },
//            onHide () {
//            }
//          })
          const title = '体验卡分享';
          const desc = '体验卡分享';
          const loc = window.location;
          const link = /#/.test(loc.href) ? loc.href.split('#')[0] : loc.href;
          const {appId, timestamp, nonceStr, signature} = data;
          wx.config({
            debug: true,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
            appId,
            timestamp,
            nonceStr,
            signature,
          });
          wx.error((res) => {
            this.showAlert(JSON.stringify(res) + '****|****' + JSON.stringify(data) + '->获取配置失败！');
          });
          wx.ready(() => {
            const self = this;
            //分享到朋友圈
            wx.onMenuShareTimeline({
              title: title,
              desc: desc,
              link: link,
              imgUrl: imgUrl,
              success: () => {
                self.showAlert('成功分享到朋友圈！');
              },
              cancel: () => {
                self.showAlert('分享失败,您取消了分享！');
              }
            });
            // 分享给朋友
            wx.onMenuShareAppMessage({
              title: title,
              desc: desc,
              link: link,
              imgUrl: imgUrl,
              success: () => {
                self.showAlert('成功分享给朋友！');
              },
              cancel: () => {
                self.showAlert('分享失败,您取消了分享！');
              }
            });
          });
        })
      }
    }
  }
</script>

