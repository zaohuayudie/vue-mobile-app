/**
 * Created by antianlu on 2017/5/4.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import * as modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: modules,
  strict: false,
  plugins: []
  // plugins: debug ? [createLogger()] : []
})

// ## Hot module replacement
// if (module.hot) {
//   module.hot.accept([
//     './getters',
//     './mutations',
//     './actions'
//   ], () => {
//     store.hotUpdate({
//       getters: require('./getters'),
//       mutations: require('./mutations'),
//       actions: require('./actions'),
//       modules: {}
//     })
//   })
// }

export default store
