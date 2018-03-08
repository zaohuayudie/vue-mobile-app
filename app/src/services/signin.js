/**
 * Created by likaihua on 2017-5-22 16:17.
 */
import axios from '../lib/axios'

const API_PREFIX = '/api/v1';

export default {
  getCaptcha (params) {
    return axios.post(`${API_PREFIX}/send`, params)
  },
  doSignin (params) {
    return axios.post(`${API_PREFIX}/passprot`, params)
  }
}
