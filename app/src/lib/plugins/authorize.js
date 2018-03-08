/**
 * Check login state
 * Some middleware to help us ensure the user is authenticated.
 * https://github.com/vuejs/vue-router/issues/1048
 * https://jsfiddle.net/yezr0jjt/
 */

import store from '../../store/index'
import router from '../../routes/index'

export default Vue => {
// Authorize
// Make sure that is the first hook.
  router.beforeHooks.unshift((to, from, next) => {
    // don't need authorize
    if (!to.meta.requireOauth) {
      return next()
    }
    if (!store.state.userInfo || !store.state.userInfo.mailNickname) {
      // check user login state
      store.dispatch('getUserProfile')
        .then((res) => {
          // authorized
          res = res.data
          if (res.success && res.data && res.data.isLogin) {
            // console.log('authorized', res.data)
            store.commit('SET_USER_PROFILE', res.data)
            return next()
          } else {
            // unauthorized
            // console.log('Unauthorized', to.fullPath)
            let loc = window.location
            let hostName = 'http://www.zaohuayudie.com/user/login'
            if (/local|test/.test(loc.hostname)) {
              hostName = 'http://cms-test.zaohuayudie.com/user/login'
            }
            window.location.href = hostName + '?rd=' + window.location.href
            // next({name: 'login', query: {redirect: to.fullPath}})
          }
        })
    } else {
      return next()
    }
  })
}
