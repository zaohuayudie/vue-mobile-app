const utils = require('../lib/util');
export const collapse = state => state.collapse


export const getCookie = state => {
  let userinfo = utils.cookie('userinfo')
  let _userinfo = {}
  if (userinfo) {
    _userinfo = typeof userinfo === 'object' ? userinfo : JSON.parse(userinfo)
  }
  state.cookies = Object.assign({}, state.cookies, _userinfo)
  return state.cookies
}
