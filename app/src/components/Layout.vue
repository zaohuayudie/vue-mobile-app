<template>
  <div style="height:100%;">
    <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
    </div>
    <!--<div v-transfer-dom>-->
    <!--<actionsheet :menus="menus" v-model="showMenu" @on-click-menu="changeLocale"></actionsheet>-->
    <!--</div>-->

    <drawer
      width="200px;"
      :show.sync="drawerVisibility"
      :show-mode="showModeValue"
      :placement="showPlacementValue"
      :drawer-style="{'background-color':'#35495e', width: '200px'}">

      <!-- drawer content -->
      <div slot="drawer">
        <group title="Drawer demo(beta)" style="margin-top:20px;">
          <cell title="Demo" link="/demo" value="演示" @click.native="drawerVisibility = false">
          </cell>
          <cell title="Buy me a coffee" link="project/donate" @click.native="drawerVisibility = false">
          </cell>
          <cell title="Github" link="#" value="Star me"
                @click.native="drawerVisibility = false">
          </cell>
        </group>
        <group title="showMode">
          <radio v-model="showMode" :options="['push', 'overlay']" @on-change="onShowModeChange"></radio>
        </group>
        <group title="placement">
          <radio v-model="showPlacement" :options="['left', 'right']" @on-change="onPlacementChange"></radio>
        </group>
      </div>

      <!-- main content body-padding-top="46px"-->
      <view-box ref="viewBox" body-padding-bottom="55px">

        <!--<x-header slot="header"-->
        <!--style="width:100%;position:absolute;left:0;top:0;z-index:100;"-->
        <!--:title="title"-->
        <!--:left-options="leftOptions"-->
        <!--:right-options="rightOptions"-->
        <!--:transition="headerTransition"-->
        <!--@on-click-more="onClickMore">-->
        <!--<span v-if="route.path === '/search'" slot="overwrite-left"-->
        <!--@click="drawerVisibility = !drawerVisibility">-->
        <!--<x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>-->
        <!--</span>-->
        <!--</x-header>-->
        <!--@after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"-->
        <!-- remember to import BusPlugin in main.js if you use components: x-img and sticky -->
        <transition
          :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
          <keep-alive>
            <router-view class="router-view"></router-view>
          </keep-alive>
        </transition>

        <!--<xs-tab-bar></xs-tab-bar>-->
        <!--<div class="cookie-test">-->
          <!--<div class="cookie-data">{{cookies}}</div>-->
          <!--<button class="cookie-refresh" @click="onRefresh">刷新</button>-->
        <!--</div>-->
      </view-box>
    </drawer>
  </div>
</template>

<script>
  import XsTabBar from '../components/XsTabBar.vue';
  import {
    Radio,
    Group,
    Cell,
    Badge,
    Drawer,
    Actionsheet,
    ButtonTab,
    ButtonTabItem,
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem,
    Loading,
    TransferDom
  } from 'vux'
  import {mapState, mapActions} from 'vuex'
  import * as utils from '../lib/util'
  export default {
    name: 'Layout',
    directives: {
      TransferDom
    },
    components: {
      Radio,
      Group,
      Cell,
      Badge,
      Drawer,
      ButtonTab,
      ButtonTabItem,
      ViewBox,
      XHeader,
      Tabbar,
      TabbarItem,
      Loading,
      Actionsheet,
      XsTabBar
    },
    methods: {
      onRefresh () {
        this.cookies = `userinfo=${utils.cookie('userinfo')}`
      },
      onShowModeChange (val) {
        /** hide drawer before changing showMode **/
        this.drawerVisibility = false
        setTimeout(one => {
          this.showModeValue = val
        }, 400)
      },
      onPlacementChange (val) {
        /** hide drawer before changing position **/
        this.drawerVisibility = false
        setTimeout(one => {
          this.showPlacementValue = val
        }, 400)
      },
      onClickMore () {
        this.showMenu = true
      },
      changeLocale (locale) {
        this.$i18n.set(locale)
        this.$locale.set(locale)
      },
      ...mapActions([
        'updateDemoPosition'
      ])
    },
    mounted () {
      this.handler = () => {
        if (this.path === '/demo') {
          this.box = document.querySelector('#demo_list_box')
          this.updateDemoPosition(this.box.scrollTop)
        }
      }
    },
    beforeDestroy () {
      this.box && this.box.removeEventListener('scroll', this.handler, false)
    },
    watch: {
      path (path) {
        if (path === '/component/demo') {
          this.$router.replace('/demo')
          return
        }
        if (path === '/demo') {
          setTimeout(() => {
            this.box = document.querySelector('#demo_list_box')
            if (this.box) {
              this.box.removeEventListener('scroll', this.handler, false)
              this.box.addEventListener('scroll', this.handler, false)
            }
          }, 1000)
        } else {
          this.box && this.box.removeEventListener('scroll', this.handler, false)
        }
      }
    },
    computed: {
      ...mapState({
        showBack: state => state.showBack,
        route: state => state.route,
        path: state => state.route.path,
        deviceready: state => state.app.deviceready,
        isLoading: state => state.isLoading,
        direction: state => state.direction
      }),
      isShowBar () {
        if (/component/.test(this.path)) {
          return true
        }
        return false
      },
      headerTransition () {
        return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
      },
      title () {
        this.$store.state.tabbarSelectedIndex = 0
        if (this.route.path === '/') return '体验卡申请'
        if (this.route.path === '/search') {
          this.showBack = true
          return '地址搜索'
        }
        if (this.route.path === '/my') {
          this.$store.state.tabbarSelectedIndex = 1
          return '我的体验卡'
        }
        return ''
      },
      leftOptions () {
        return {
          showBack: this.showBack
        }
      },
      rightOptions () {
        return {
          showMore: false
        }
      }
    },
    data () {
      return {
        cookies: `userinfo=${utils.cookie('userinfo')}`,
        showMenu: false,
        menus: {
          'language.noop': '<span class="menu-title">Language</span>',
          'zh-CN': '中文',
          'en': 'English'
        },
        drawerVisibility: false,
        showMode: 'push',
        showModeValue: 'push',
        showPlacement: 'left',
        showPlacementValue: 'left'
      }
    },
  }
</script>

<style lang="less">
  .cookie-test {
    position: absolute;
    bottom: 90px;
    opacity: .5;
    font-size: 12px;
    width: 100%;
    padding:10px;
    background: #000;
    color: #ffffff;
    .cookie-data{
      width:750px;
      word-wrap: break-word;
    }
    .cookie-refresh{
      color: #ffffff;
      background: #4d8bee;
      display: block;
      padding:5px 10px;
    }
  }

  .weui-tabbar.vux-demo-tabbar {
    /** backdrop-filter: blur(10px);
    background-color: none;
    background: rgba(247, 247, 250, 0.5);**/
  }

  .vux-demo-tabbar .weui-bar__item_on .demo-icon-22 {
    color: #F70968;
  }

  .vux-demo-tabbar .weui-tabbar_item.weui-bar__item_on .vux-demo-tabbar-icon-home {
    color: rgb(53, 73, 94);
  }

  .demo-icon-22:before {
    content: attr(icon);
  }

  .vux-demo-tabbar-component {
    background-color: #F70968;
    color: #fff;
    border-radius: 7px;
    padding: 0 4px;
    line-height: 14px;
  }

  .weui-tabbar__icon + .weui-tabbar__label {
    margin-top: 0 !important;
  }

  .vux-demo-header-box {
    z-index: 100;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
  }

  /*@font-face {*/
  /*font-family: 'vux-demo';  !* project id 70323 *!*/
  /*src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot');*/
  /*src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot?#iefix') format('embedded-opentype'),*/
  /*url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.woff') format('woff'),*/
  /*url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.ttf') format('truetype'),*/
  /*url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.svg#iconfont') format('svg');*/
  /*}*/
  .router-view {
    width: 100%;
    /*top: 46px;*/
  }

  .router-view .weui-btn:after {
    border: none;
  }

  .weui-tab__panel {
    background-color: #ffffff;
  }

  .vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    will-change: transform;
    transition: all 500ms;
    height: 100%;
    /*top: 46px;*/
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
  }

  .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .menu-title {
    color: #888;
  }
</style>
