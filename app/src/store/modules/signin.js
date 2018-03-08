import * as utils from '../../lib/util'
/**
 * 初始化state集合
 * @type {{list: Array}}
 */
const state = {
  mobile: utils.cookie('mobile') || '',
  uid: utils.cookie('uid') || ''
}

/**
 * 获取数据
 * @type {{}}
 */
const getters = {}

/**
 * 执行方式:同步
 * 操作对象:state
 * @type {{}}
 */
const mutations = {}
/**
 * 执行方式:异步
 * 操作对象:所有异步请求等
 * @type {{getProjectList: (function({commit: *}, *=))}}
 */
const actions = {}

export default {
  state,
  getters,
  actions,
  mutations
}
