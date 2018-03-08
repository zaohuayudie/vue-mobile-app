/**
 * Created by antianlu on 2017/10/31.
 */

import Services from '../../services'
import * as types from '../constants/types'

/**
 * 初始化state集合
 * @type {{list: Array}}
 */
const state = {
  pageInfo: {},
  applySuccess: [],
  current: {},
  myorder: [],
  currentIndex: 0
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
const mutations = {
  [types.APLLYCARD_GET_PAGEINFO] (state, res) {
    state.pageInfo = res || {}
  },
  [types.APPLYCARD_GET_SUCCESS] (state, res) {
    state.applySuccess = res || []
  },
  [types.APPLYCARD_GET_MYORDER] (state, res) {
    state.myorder = res || []
  }
}

/**
 * 执行方式:异步
 * 操作对象:所有异步请求等
 */
const actions = {
  getApplyCardPageInfo ({commit}, params) {
    params = params || {}
    Services.applyCard.getApplyCardPageInfo(params).then(res => {
      commit(types.APLLYCARD_GET_PAGEINFO, res.data)
    }).catch(err => {
      console.log(err)
    })
  },
  getApplySuccess ({commit}, params) {
    Services.applyCard.getApplySuccess().then(res => {
      commit(types.APPLYCARD_GET_SUCCESS, res.data)
    }).catch(err => {
      console.log(err)
    })
  },
  getMyOrder ({commit}, params) {
    Services.applyCard.getMyOrder().then(res => {
      commit(types.APPLYCARD_GET_MYORDER, res.data)
    }).catch(err => {
      console.log(err)
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
