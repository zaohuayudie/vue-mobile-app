/**
 * Created by antianlu on 2017/11/14.
 */
// amap.js
import Vue from 'vue'

let VueAMap
function promiseAMapComponent(comp) {
  return () => {
    if (VueAMap) {
      return Promise.resolve(VueAMap[comp])
    } else {
      return import('vue-amap').then(vam => {
        if (!VueAMap) {
          // 模拟Vue并代替插件初始化
          vam.default.install({
            config: JSON.parse(JSON.stringify(Vue.config)),
            component () {
            }
          }, {})
          // vue-amap初始化
          vam.initAMapApiLoader(config)
          VueAMap = vam.default
        }
        return VueAMap[comp]
      })
    }
  }
}

export const config = {
  key: '947b2bf0ada2d64ade3c949c9c71d376',
  plugin: ['AMap.Autocomplete', 'PlaceSearch', 'AMap.Geolocation']
}

export const Amap = promiseAMapComponent('Amap')
// export const AmapSearchBox = promiseAMapComponent('AmapSearchBox')
