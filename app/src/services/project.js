/**
 * Created by antianlu on 2017/5/9.
 */
import axios from '../lib/axios'

const API_PREFIX = '/pcms/api/v2'
const PROJECT_PREFIX = API_PREFIX + '/project'

export default {
  getProjectList (params) {
    return axios.get(PROJECT_PREFIX + '/list')
  },
  deleteProject (projectId) {
    return axios.post(PROJECT_PREFIX + '/delete/' + projectId)
  },
  createProject (params) {
    return axios.post(PROJECT_PREFIX + '/create', params)
  },
  updateProject (params) {
    const projectId = params.projectId
    delete params.projectId
    return axios.post(PROJECT_PREFIX + '/update/' + projectId, params)
  }
}
