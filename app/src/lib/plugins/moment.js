/**
 * Created by antianlu on 2017/7/11.
 */
import moment from 'moment'
moment.locale('zh-cn')
export default Vue => {
  Object.defineProperties(Vue, {
    moment: {get: () => moment}
  })

  Object.defineProperties(Vue.prototype, {
    $moment: {get: () => moment}
  })
}
