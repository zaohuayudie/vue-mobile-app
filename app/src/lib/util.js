import storage from 'store'
import _ from 'lodash'

let util = {}
util.title = function (title) {
  title = title ? title + ' - 香送最烘培' : '香送最烘培'
  window.document.title = '体验卡申请' //title
}

export {util, storage}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find(list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy(obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

/**
 * forEach for object
 */
export function forEachValue(obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}

export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

export function isPromise(val) {
  return val && typeof val.then === 'function'
}

export function assert(condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`)
}

export function cookie(name, value, options) {
  if (typeof value !== 'undefined') {
    options = options || {}
    if (value === null) {
      value = ''
      options = _.assign({}, options)
      options.expires = -1
    }
    let expires = ''
    if (options.expires && (typeof options.expires === 'number' || options.expires.toUTCString)) {
      let date
      if (typeof options.expires === 'number') {
        date = new Date()
        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000))
      } else {
        date = options.expires
      }
      expires = '; expires=' + date.toUTCString()
    }
    let path = options.path ? '; path=' + (options.path) : ''
    let domain = options.domain ? '; domain=' + (options.domain) : ''
    let secure = options.secure ? '; secure' : ''
    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('')
  } else {
    let cookieValue = null
    if (document.cookie && document.cookie !== '') {
      let cookies = document.cookie.split(';')
      for (let i = 0; i < cookies.length; i++) {
        let cookie = _.trim(cookies[i])
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
          break
        }
      }
    }
    return cookieValue
  }
}

export function cookieForUserInfo(values) {

  let userInfo = cookie('userinfo')
  let _userInfo = {}
  if (userInfo) {
    _userInfo = typeof userInfo === 'object' ? userInfo : JSON.parse(userInfo)
  }
  if (values) {
    _userInfo = _.assign({}, _userInfo, typeof values === 'object' ? values : {})
    let options = {
      domain: '.xiangsong.cn',
      path: '/'
    }
    cookie('userinfo', null)
    cookie('userinfo', JSON.stringify(_userInfo), options)
  }
  return _userInfo
}
