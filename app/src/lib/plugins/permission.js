/**
 * Created by antianlu on 2017/5/24.
 */
import store from '../../store'

function permissionAction (params) {
  let userInfo = store.state.userInfo
  if (params && typeof params === 'string') {
    return !!(userInfo.permission && userInfo.permission[params])
  }
  let {groupName, action} = params
  if (groupName) {
    let actions = userInfo.permission && userInfo.permission[groupName]
    if (actions) {
      return actions.indexOf(action) > -1
    }
  }
  return false
}

export default Vue => {
  Object.defineProperties(Vue, {
    permissionAction: {
      get: () => permissionAction
    }
  })

  Object.defineProperties(Vue.prototype, {
    $permissionAction: {
      get: () => permissionAction
    }
  })
}
