/**
 * Created by antianlu on 2017/5/9.
 */
import Services from '../../services'
import * as types from '../constants/types'

/**
 * 初始化state集合
 * @type {{list: Array}}
 */
const state = {
  projects: {},
  current: {},
  currentIndex: 0
}

/**
 * 获取数据
 * @type {{}}
 */
const getters = {
  currentIndex: state => state.currentIndex,
  projects: state => state.projects,
  current: state => {
    return state.current || (state.projects.length > 0 ? state.projects[0] : {})
  }
}

/**
 * 执行方式:同步
 * 操作对象:state
 * @type {{}}
 */
const mutations = {
  [types.PROJECT_GET_LIST] (state, res) {
    state.projects = res.data || {}
  },
  [types.PROJECT_GET_CURRENT] (state, index) {
    state.current = state.projects.results.length > 0 ? state.projects.results[index] : {}
    state.currentIndex = index
  }
}

/**
 * 执行方式:异步
 * 操作对象:所有异步请求等
 * @type {{getProjectList: (function({commit: *}, *=))}}
 */
const actions = {
  getProjectList ({commit}, params) {
    params = params || {}
    Services.project.getProjectList(params).then(res => {
      commit(types.PROJECT_GET_LIST, res.data)
      commit(types.PROJECT_GET_CURRENT, params.index || state.currentIndex)
    }).catch(err => {
      console.log(err)
    })
  },
  getCurrentProject ({commit}, index) {
    commit(types.PROJECT_GET_CURRENT, index)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
