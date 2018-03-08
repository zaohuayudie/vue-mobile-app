// 移动端适配
import 'amfe-flexible'

//引入cue-amap
// import VueAMap from 'vue-amap'

// 移除移动端点击延迟
import FastClick from 'fastclick'
import Vue from 'vue'
// 按需引入部分组件

import {sync} from 'vuex-router-sync'
import router from './routes'
import store from './store'
import {util} from './lib/util'
import plugins from './lib/plugins'
import App from './App.vue'
import {BusPlugin, LoadingPlugin, AlertPlugin, WechatPlugin} from 'vux'
// 导入公共样式
// import 'assets/styles/app.less'

// Vue.component(Cell.name, Cell);
// Vue.component(Checklist.name, Checklist);

Vue.use(plugins)
Vue.use(BusPlugin)
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
Vue.use(WechatPlugin) // 微信
const wx = Vue.wechat;

// Vue.use(VueAMap)
// //初始化地图信息
// VueAMap.initAMapApiLoader({
//   // 申请的高德key
//   key: '947b2bf0ada2d64ade3c949c9c71d376',
//   // 插件集合
//   plugin: ['AMap.Autocomplete', 'PlaceSearch', 'AMap.Geolocation']
// });

FastClick.attach(document.body)

// ## Config
let isDebugMode = (process.env.NODE_ENV === 'development')

Vue.config.debug = isDebugMode
Vue.config.silent = !isDebugMode
Vue.config.devtools = isDebugMode
Vue.config.productionTip = isDebugMode


sync(store, router, {moduleName: 'route'})

router.beforeEach((to, from, next) => {
  // iView.LoadingBar.start()
  util.title(to.meta.title)
  next()
})

router.afterEach((to, from, next) => {
  // iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

const app = new Vue({
  // name: 'root',
  // i18n: i18n,
  store,
  router,
  render: h => h(App)
})
app.$mount('#app')
