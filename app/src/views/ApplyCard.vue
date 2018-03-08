<style lang="less">
  .xs-apply-card {
    background-color: #ffffff;
  }

  .xs-apply-card .weui-cells {
    font-size: 32px;
  }

  .xs-apply-card .weui-btn {
    border-radius: 50px;
    background: #f4413f;
  }

  .buy-btn.weui-btn {
    width: 400px;
    margin-top: 50px;
    margin-bottom: 80px;
    height: 80px;
  }

  .xs-apply-card .weui-btn_primary:not(.weui-btn_disabled):active {
    color: rgba(255, 255, 255, 0.6);
    background-color: #F4211E;
  }

  .xs-apply-card .weui-btn_disabled.weui-btn_primary {
    background-color: #ee9099;
  }

  .xs-apply-card .delivery-address .weui-cell__ft {
    width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 28px;
    text-align: left;
  }

  .xs-apply-card .vux-no-group-title {
    margin-top: 0;
    border-top: none;
  }

  .xs-apply-card .apply-city .weui-cell__ft {
    color: #333333;
    padding-left: 30px;
  }

  .xs-apply-card .vux-label {
    font-size: 32px;
  }

  .xs-apply-card .weui-input, .xs-apply-card .vux-cell-value {
    font-size: 28px;
  }

  .xs-apply-card .input-box .vux-x-input .weui-label {
    width: 120px !important;
  }

  .xs-apply-card .weui-cells.vux-no-group-title:after, .xs-apply-card .weui-cells.vux-no-group-title:before {
    border-top: none;
  }

  .xs-apply-card .banner {
    text-align: center;
  }

  .xs-apply-card .banner img {
    max-height: 350px;
    width: 100%;
    display: block;
    overflow: hidden;
  }
</style>
<template>
  <div class="xs-apply-card">
    <x-header :left-options="{showBack: false}">体验卡申请</x-header>
    <div class="banner">
      <!--<x-img src="../assets/images/banner.jpg" style="width:100%;display:block;"></x-img>-->
      <img :src="(pageInfo && pageInfo.showimg) || defaultBanner" :onerror="logo">
    </div>
    <group>
      <div class="input-box">
        <x-input v-show="uInfo.mobile" disabled title="手机号" placeholder="仅支持中国大陆手机号" v-model="uInfo.mobile">
        </x-input>
        <x-input v-show="!uInfo.mobile" title="手机号" placeholder="仅支持中国大陆手机号" v-model="applyForm.mobile"
                 keyboard="number"
                 is-type="china-mobile" mask="999 9999 9999" :max="13">
          <x-button :disabled="disabledSendMsg" class="apply-captcha" @click.native="onGetCaptcha" slot="right"
                    type="primary" mini>
            {{sendBtnText}}
          </x-button>
        </x-input>
        <x-input v-show="!uInfo.mobile" title="验证码" placeholder="请输入验证码" v-model="applyForm.captcha" :max="8"></x-input>
      </div>
      <cell class="apply-city" title="所在城市" value="北京" value-align="left" v-model="applyForm.city"></cell>
      <cell class="delivery-address" @click.native="onSearchAddress" title="收货地址" :value="applyForm.deliveryAddress"
            is-link link="/card/search"></cell>
      <x-input title="详细地址" placeholder="请填写详细门牌号等" v-model="applyForm.streetAddress"></x-input>
      <popup-picker title="选择送达时间" :data="deliveryDateList" v-model="deliveryDate" show-name
                    @on-change="onChangeDeliveryDate"></popup-picker>
      <x-input title="备注" placeholder="其他的需求（选填）" v-model="applyForm.remark"></x-input>
    </group>
    <!--先预定，后付费-->
    <x-button @click.native="onApplyCard" type="primary" class="buy-btn">下单并支付</x-button>
    <br>
  </div>
</template>

<script>
  import {XHeader, XInput, Group, XButton, Cell, PopupPicker, XImg} from 'vux'
  import {mapState} from 'vuex'
  import Services from '../services'
  import * as utils from '../lib/util'
  let defaultBanner = require('../assets/images/banner.jpg')
  export default {
    created () {
      this.$store.state.direction = 'forward'
//      let sid = this.$route.query.sid
//      let pid = this.$route.query.pid
//      let sale = this.$route.query.sale

//      userInfo.sid = sid || userInfo.sid || null
//      userInfo.sale = sale || userInfo.sale || null
//      userInfo.pid = pid || userInfo.pid || null
      utils.cookieForUserInfo(this.$route.query)
//      console.log(this.$route)
//      this.showAlert('query:' + JSON.stringify(this.$route.query || {}) + ',fullPath:' + this.$route.fullPath)
      let userInfo = utils.cookieForUserInfo()
      // 初始化默认值
      this.$store.state.applyForm.deliveryDate = this.deliveryDate
      this.$store.state.applyForm.mobile = userInfo.mobile || null
      this.$store.dispatch('getApplyCardPageInfo', {
        sale: userInfo.sale,
        pid: userInfo.pid
      })
    },
    data () {
      return {
        sendBtnText: '发送验证码',
        defaultBanner: defaultBanner,
        deliveryDate: [`${this.$moment().format('YYYY-MM-DD')}`, '-', '11:00'],
        deliveryDateList: [
          this.getWeekDate(),
          [{name: '-', value: '-'}],
          this.getTimeQuantum()
        ],
        logo: 'this.src="' + defaultBanner + '"'
      }
    },
    components: {
      XHeader,
      XInput,
      Group,
      XButton,
      Cell,
      PopupPicker,
      XImg
    },
    computed: {
      ...mapState({
        pageInfo: state => state.applyCard.pageInfo,
        applyForm: state => state.applyForm,
        signin: state => state.signin,
        uInfo: state => {
//          let userInfo = utils.cookieForUserInfo()
          return utils.cookieForUserInfo()
        }
      }),
      disabledSendMsg () {
        return !(this.applyForm.mobile && this.applyForm.mobile.length > 10)
      }
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
      getTimeQuantum () {
        let startTime = 8
        let endTime = 14
        let timeQuantum = []
        for (let i = startTime; i < endTime; i++) {
//          timeQuantum.push(`${i}:00-${i + 1}:00`)
          timeQuantum.push({
            name: `${i}:00-${i + 1}:00`,
            value: `${i + 1}:00`
          })
        }
        return timeQuantum
      },
      getWeekDate () {
        let nowDate = this.$moment()
        let data = [];
        let weekZH = ['一', '二', '三', '四', '五', '六', '日']
        for (let i = 0; i < 7; i++) {
          nowDate = nowDate.add(i ? 1 : 0, 'days')
          // ${nowDate.format('MM-DD')}
          data.push({
            name: `星期${weekZH[nowDate.weekday()]}`,
            value: `${nowDate.format('YYYY-MM-DD')}`
          })
        }
        return data
      },
      onSearchAddress () {
        this.$store.state.showBack = true
        this.$store.state.direction = 'forward'
        // 由于缓存了子组件多次点击会返回滑动方向会不一致，使用异步延迟设置方法
        window.setTimeout(() => {
          this.$store.state.direction = 'end'
        }, 500)
      },
      onChangeDeliveryDate (val) {
        this.applyForm.deliveryDate = val
      },
      onApplyCard () {
        let self = this
        let userInfo = utils.cookieForUserInfo();
        let besttime = this.applyForm.deliveryDate[0] + ' ' + this.applyForm.deliveryDate[2]
        let applyData = {
          sale: userInfo.sale,
          pid: this.pageInfo.pid,
          sid: userInfo.sid,
          city: '北京',
          besttime: besttime,// 配送时间
          receiving_address: this.applyForm.deliveryAddress,// 收货人
          buyerremark: this.applyForm.remark,// 备注
          detailed_address: this.applyForm.streetAddress, // 收货地址
          lng: this.applyForm.lng, // 经度
          lat: this.applyForm.lat, // 维度
          mobile: userInfo.mobile || ''
        }
        if (!userInfo.mobile) {
          let applyMobile = (this.applyForm.mobile && this.applyForm.mobile.replace(/\s/g, '')) || null
          if (applyMobile) {
            applyData.mobile = applyMobile.replace(/\s/g, '')
          } else {
            return this.showAlert('请填写手机号')
          }
          applyData.code = this.applyForm.captcha
        }
        Services.applyCard.doApplyCard(applyData).then(res => {
          this.$vux.loading.show({
            text: '正在调转支付页面......'
          })
          if (res && res.code === 0) {
            utils.cookieForUserInfo({mobile: applyData.mobile});
            let loc = window.location;
            let host = loc.protocol + '//' + loc.host
            this.$vux.loading.hide()
            window.location.href = `${res.data.redirect_uri}&callback_url=${host}`;
          }
//          if (res.message === 'success') {
//            // get my order data
//            this.$store.dispatch('getMyOrder')
//            this.$router.push({
//              path: '/card/order'
//            });
//          }
          else {
            this.$vux.loading.hide()
            this.showAlert(res.message)
          }
        }).catch(err => {
          this.$vux.loading.hide()
          console.log(err, 'catch')
//          this.showAlert(err, 'catch')
        })
      },
      onGetCaptcha () {
        let timer = null
        let mobile = this.applyForm.mobile.replace(/\s/g, '')
        if (!mobile) return this.showAlert('手机号不能为空')
        Services.signin.getCaptcha({mobile: mobile, type: 2}).then(res => {
          if (res.code === 0) {
            // send message to mobile
            this.disabledSendMsg = true
            let n = 119
            timer = setInterval(() => {
              this.sendBtnText = `已发送（${n--}）`
              if (n === 0) {
                timer && clearInterval(timer)
              }
            }, 1000)
          } else {
            this.showAlert(res.message)
          }
        }).catch(err => {
          this.showAlert('验证码发送失败')
        })
      },
    }
  }
</script>
