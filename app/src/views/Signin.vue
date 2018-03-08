<style lang="less">
  .xs-login-wrapper {
    height: 100%;
    background: #fff;
    width: 100%;

  .vux-header {
    background: #f0f0f1;

  .vux-header-title {
    color: #333333;
    font-size: 32px;
  }

  }

  .weui-cell__hd {
    /*padding-left: 10px;*/
    vertical-align: middle;
    text-align: center;
    display: table;
  }

  .weui-cells {
    margin-top: 0;
    padding-top: 0;
    padding-bottom: 0;

  &
  :before {
    border-top: none
  }

  }
  .weui-input {
    padding-left: 30px;
    height: 68px;
    font-size: 32px;
  }

  .xs-login img {
    padding-top: 8px;
  }

  .login-mobile img {
    width: 31px;
    height: 47px;
  }

  .login-captcha img {
    width: 33px;
    height: 51px;
  }

  .xs-btn-next {
    background: #4d8bee;
    width: 400px;
    margin-top: 175px;
    border-radius: 50px;
  }

  .weui-btn_primary:not(.weui-btn_disabled):active {
    color: rgba(255, 255, 255, 0.6);
    background-color: #3361ee;
  }

  .weui-btn_primary.weui-btn_disabled {
    background-color: #7d9fee;
  }

  .xs-captcha-btn {
    background: #4d8bee;
    border-radius: 50px;
  }

  }

</style>
<template>
  <div class="xs-login-wrapper">
    <x-header :left-options="{showBack: false}">登录</x-header>
    <div class="xs-login-container">
      <group>
        <x-input class="xs-login login-mobile" placeholder="购买体验卡的手机号" v-model="mobileX" keyboard="number"
                 is-type="china-mobile" mask="999 9999 9999" :max="13">
          <img slot="label" src="../assets/images/login_mobile.png">
        </x-input>
      </group>
      <group>
        <x-input title="验证码" class="xs-login login-captcha" placeholder="验证码" v-model="captcha" :max="8">
          <img slot="label" src="../assets/images/login_captcha.png">
          <x-button :disabled="disabledSendMsg" @click.native="onGetCaptcha" class="xs-captcha-btn" slot="right"
                    type="primary" mini>{{sendBtnText}}
          </x-button>
        </x-input>
      </group>

      <x-button @click.native="doSignin" :disabled="disabledSubmit" class="xs-btn-next" type="primary">下一步</x-button>

    </div>
  </div>
</template>

<script>
  import {XHeader, XInput, Group, XButton, Cell, Alert} from 'vux'
  import Services from '../services'
  import * as utils from '../lib/util'
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        sendBtnText: '获取验证码',
        captcha: '',
        mobileX: ''
      }
    },
    components: {
      XHeader,
      XInput,
      Group,
      XButton
    },
    created () {
      let userInfo = utils.cookieForUserInfo()
      if (userInfo && (userInfo.unionid || userInfo.uid)) {
        this.$router.push({
          path: '/card/order'
        });
      }
    },
    computed: {
      ...mapState({
        mobile: state => state.mobile,
        uid: state => state.uid
      }),
      disabledSubmit(){
        return !(!!(this.mobileX && this.mobileX.length > 10) && !!(this.captcha && this.captcha.length > 4))
      },
      disabledSendMsg() {
        return !(this.mobileX && this.mobileX.length > 10)
      }
    },
    methods: {
      onGetCaptcha() {
        let timer = null
        let mobile = this.mobileX.replace(/\s/g, '')
        Services.signin.getCaptcha({mobile: mobile, type: 1}).then(res => {
          if (res && res.code === 0) {
            // send message to mobile
            this.disabledSendMsg = true
            let n = 59
            timer = timer || window.setInterval(() => {
                this.sendBtnText = `已发送（${n--}）`
                if (n === 0) {
                  timer && window.clearInterval(timer)
                }
              }, 1000)
          } else {
            this.showAlert(res.message)
          }
        }).catch((err) => {
//          console.log(err)
//          this.showAlert('验证码发送失败')
        })
      },
      showAlert(message){
        this.$vux.alert.show({
          title: '提示',
          content: message || '未知错误',
          onShow () {
          },
          onHide () {
          }
        })
      },
      doSignin() {
        let self = this
        let mobile = this.mobileX.replace(/\s/g, '')
        Services.signin.doSignin({
          mobile: mobile,
          code: this.captcha
        }).then(res => {
          // 1.保存登录信息
          self.$store.state.signin.mobile = mobile
          let dt = res.data;
          if (res.code === 0) {
            // 2.路由跳转
            self.$store.state.signin.uid = dt.uid
            let userInfo = utils.cookieForUserInfo()
            userInfo.uid = dt.uid;
            userInfo.mobile = dt.mobile
            utils.cookieForUserInfo(userInfo)
            this.$router.push({
              path: '/card/order'
            });
          } else {
            this.showAlert(res.message)
          }

        }).catch(err => {
          console.log(err)
          //this.showAlert('')
        })
      }
    }
  }
</script>
