/**
 * Created by antianlu on 2017/7/6.
 */

import axios from './axios'
import moment from './moment'
import lodash from './lodash'
import authorize from './authorize'
import permission from './permission'
import directive from './directive'

export default {
  install (Vue) {
    axios(Vue)
    moment(Vue)
    lodash(Vue)
    authorize(Vue)
    permission(Vue)
    directive(Vue)
  }
}
