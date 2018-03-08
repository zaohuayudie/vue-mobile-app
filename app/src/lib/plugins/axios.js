/**
 * Created by antianlu on 2017/5/23.
 */
import axios from '../axios'

export default Vue => {
  // mount the axios to Vue
  Object.defineProperties(Vue, {
    http: {get: () => axios}
  })

  // mount the axios to Vue component instance
  Object.defineProperties(Vue.prototype, {
    $http: {get: () => axios}
  })
}
