/**
 * Created by likaihua on 2017-5-22 16:17.
 */
import axios from '../lib/axios'

const API_PREFIX = '/api/v1';

export default {
  getConfig(params) {
    return axios.get(`${API_PREFIX}/share_config`, {params: params})
  },
  getShare() {
    return axios.get(`${API_PREFIX}/share`)
  }
}
