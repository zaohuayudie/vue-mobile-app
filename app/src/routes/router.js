/**
 * Created by antianlu on 2017/5/8.
 */
// import children from './children'

const router = [

  {
    path: '/card',
    component: (resolve) => require(['../components/Layout.vue'], resolve),
    children: [
      {
        name: 'apply',
        path: 'apply',
        meta: {
          title: '卡券申请'
        },
        component: (resolve) => {
          require(['../views/ApplyCard.vue'], resolve)
        }
      },
      {
        name: 'search',
        path: 'search',
        component: (resolve) => {
          require(['../views/AddressSearch.vue'], resolve)
        }
      },
      {
        name: 'order',
        path: 'order',
        meta: {
          title: '我的订单'
        },
        component: (resolve) => {
          require(['../views/MyOrder.vue'], resolve)
        }
      },
      {
        name: 'applysuccess',
        path: 'applysuccess',
        meta: {
          title: '支付成功'
        },
        component: (resolve) => {
          require(['../views/ApplySuccess.vue'], resolve)
        }
      },
      {
        name: 'cardInvitation',
        path: 'invitation',
        meta: {
          title: '邀请好友'
        },
        component: (resolve) => {
          require(['../views/Invitation.vue'], resolve)
        }
      }
    ]
  },
  {
    name: 'signin',
    path: '/signin',
    meta: {
      title: '登录'
    },
    component: (resolve) => {
      require(['../views/Signin.vue'], resolve)
    }
  },
  {
    name: 'signup',
    path: '/signup',
    component: (resolve) => {
      require(['../views/Signup.vue'], resolve)
    }
  },
  {
    name: 'NotFound',
    path: '*',
    meta: {
      title: 'Not Found'
    },
    component: (resolve) => {
      require(['../views/NotFound.vue'], resolve)
    }
  }
]
export default router
