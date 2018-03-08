import Service from '../services'

export const setCurrentRoute = ({commit}, currentPath) => {
  commit('SET_CURRENT_ROUTER', currentPath)
}

export const getUserProfile = ({commit}) => {
  return Service.user.getUserInfo()
}
