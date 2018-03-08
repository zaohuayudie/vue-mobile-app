/**
 * Created by antianlu on 2017/10/31.
 */

import axios from '../lib/axios'

const API_PREFIX = '/api/v1';

export default {
  getApplyCardPageInfo (params) {
    params.pid = params.pid || '3177'
    return axios.get(`${API_PREFIX}/apply`, {params: params})
  },
  doApplyCard (params) {
    return axios.post(`${API_PREFIX}/applycard`, params)
  },
  getMyOrder () {
    return axios.get(`${API_PREFIX}/myorder`)
  },
  getApplySuccess () {
    return axios.get(`${API_PREFIX}/card`)
  }
}
