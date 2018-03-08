/**
 * Created by likaihua on 2017-5-15 15:58.
 */
import axios from '../lib/axios'

const API_PREFIX = '/pcms/api/v2'

export default {
  getUserList (params) {
    return axios.get(API_PREFIX + '/user/list', {
      params: params
    })
  },
  getUserInfo (params) {
    return axios.get(API_PREFIX + '/user/profile', {
      params: params
    })
  },
  getUserById (params) {
    return axios.get(API_PREFIX + '/user/getById', {
      params: params
    })
  },
  assignRole (params) {
    return axios.post(API_PREFIX + '/user/assignRole', params)
  },
  queryUser (params) {
    return axios.get(API_PREFIX + '/user/queryUser', {
      params: params
    })
  }
}
