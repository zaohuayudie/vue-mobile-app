/**
 * Created by antianlu on 2017/7/11.
 */
import lodash from 'lodash'

export default Vue => {
  // mount the lodash to Vue
  Object.defineProperties(Vue, {
    _: {get: () => lodash}
  })

  // mount the lodash to Vue component instance
  Object.defineProperties(Vue.prototype, {
    $_: {get: () => lodash}
  })
}
