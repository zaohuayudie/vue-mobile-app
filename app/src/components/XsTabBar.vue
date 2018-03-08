<style>
  .weui-tabbar {
    width: 100%;
    position: fixed !important;
    transform: translate3d(0, 0, 0);
    /*position: sticky;*/
  }
</style>
<template>
  <tabbar @on-index-change="onChangeIndex">
    <tabbar-item :selected="tabbarSelectedIndex==0">
      <img slot="icon" src="../assets/images/tab_card_default.png">
      <img slot="icon-active" src="../assets/images/tab_card_active.png">
      <span slot="label">体验卡</span>
    </tabbar-item>
    <tabbar-item :selected="tabbarSelectedIndex==1">
      <img slot="icon" src="../assets/images/tab_my_default.png">
      <img slot="icon-active" src="../assets/images/tab_my_active.png">
      <span slot="label">我的</span>
    </tabbar-item>
  </tabbar>
</template>

<script>
  import {Tabbar, TabbarItem} from 'vux'
  import {mapState} from 'vuex'
  import * as utils from '../lib/util'
  export default {
    name: 'XsTabBar',
    components: {
      Tabbar,
      TabbarItem
    },
    computed: {
      ...mapState({
        tabbarSelectedIndex: state => {
          return state.tabbarSelectedIndex
        }
      })
    },
    methods: {
      onChangeIndex(index) {
        // 组件有bug，加载首页定位为第一个tab,需要加很多判断
        let userInfo = utils.cookieForUserInfo()
        let uid = userInfo.uid
        this.tabbarSelectedIndex = 0
        if (index === 1) {
          this.$store.state.direction = 'end'
          if (uid) {
            this.tabbarSelectedIndex = 1
            this.$router.push({
              path: '/card/order'
            })
          } else {
            this.$router.push({
              path: '/signin'
            })
          }
        } else {
          this.$store.state.direction = 'forward'
          this.$router.push({
            path: '/card/apply'
          })
        }
      }
    }
  }
</script>
