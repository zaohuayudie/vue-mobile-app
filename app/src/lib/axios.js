/**
 * Created by antianlu on 2017/5/8.
 */
import axios from 'axios'
import qs from 'qs'
// import { Alert } from 'vux'

axios.defaults.timeout = 10000
axios.defaults.headers.common['Authorization'] = ''
// axios.defaults.headers.post['Content-Type'] = 'application/json charset=UTF-8'
// POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  // Alert(JSON.stringify(config),'提示')
  return config
}, (error) => {
  // Alert('错误的传参','提示')
  return Promise.reject(error)
})
// code状态码200判断
axios.interceptors.response.use((res) => {
  // if (res.data.success !== true) {
  //   Modal.error({
  //     title: '提示',
  //     content: res.data.error
  //   })
  //   return Promise.reject(res)
  // }
  return res.data
}, (error) => {
  // MessageBox('网络异常','提示')
  return Promise.reject(error)
})
export default axios
