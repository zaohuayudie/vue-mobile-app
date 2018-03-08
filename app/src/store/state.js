/**
 * Created by antianlu on 2017/5/4.
 */

const state = {
  tabbarSelectedIndex: 0,
  isLoading: false,
  showBack: false,
  direction: 'forward',
  mobile: '',
  uid: '',
  applyForm: {
    remark: '',
    mobile: '',
    city: '北京',
    streetAddress: '',
    deliveryAddress: '请选择您的写字楼，小区或学校等',
    deliveryDate: '',
    lng: 0,
    lat: 0
  }
}

export default state
