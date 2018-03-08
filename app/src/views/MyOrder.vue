<style lang="less">
  .xs-my-card {
    font-size: 18px;
    background-color: #eee;

  .order-item {
    background-color: #ffffff;
    padding-left: 30px;
    margin-bottom: 20px;
  }

  .order-left {
    padding: 30px 0 20px 0;
  }

  .order-right {
    padding: 30px 0 20px 0;
    font-size: 28px;
  }

  .order-left img {
    /*background-color: #04BE02;*/
    height: 120px;
    width: 140px;
    border-radius: 20px;
  }

  .pay-line {
    border-top: 1PX solid #eeeeee;
    height: 80px;
    text-align: right;
  }

  .order-title {
    background-color: #ffffff;
    line-height: 80px;
    font-size: 32px;
    padding-left: 30px;
  }

  .vux-no-group-title {
    margin-top: 0;
    text-align: left;
  }

  .weui-cells {
    margin-top: 0;

  .weui-cell {
    padding-left: 0;
  }

  .weui-cell__ft {
    color: #F4211E;

  }

  }

  .weui-btn_primary {
    margin-right: 30px;
    background: #4d8bee;
  }

  .weui-btn_primary:not(.weui-btn_disabled):active {
    color: rgba(255, 255, 255, 0.6);
    background-color: #5aadee;
  }

  }
  .xs-my-order .vux-header-right .share-link {
    color: #4d8bee !important;
    font-size: 28px;
  }
</style>
<template>
  <div class="xs-my-order">
    <x-header :left-options="{showBack: false}">
      我的体验卡
      <!--<router-link @click.native="onGoShare" :to="{path:'/card/invitation'}" slot="right" class="share-link">分享抢大礼-->
      </router-link>
    </x-header>
    <div class="xs-my-card">
      <div class="order-title">体验卡订单</div>
      <div class="order-item" v-for="(order,index) in orders">
        <group>
          <cell :title="order.addtime" :value="order.statusText"></cell>
        </group>
        <flexbox>
          <flexbox-item :span="3">
            <div class="order-left">
              <img :src="order.img || defaultImg" alt="" :onerror="defaultImage">
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="order-right">
              <p>{{order.source}}</p>
              <p>￥{{order.orderamount}}</p>
            </div>
          </flexbox-item>
        </flexbox>
        <flexbox class="pay-line" v-show="order.orderstate!=70">
          <flexbox-item :span="9">
          </flexbox-item>
          <flexbox-item>
            <x-button class="pay-btn" type="primary" mini>去支付</x-button>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
  </div>
  </div>
</template>


<script>
  import {Group, Cell, XHeader, XButton, Flexbox, FlexboxItem} from 'vux'
  //  let demoImg = require('../assets/images/bread/nice.png')
  let defaultImg = require('../assets/images/default.png')
  export default {
    components: {
      XHeader,
      Group,
      Cell,
      XButton,
      Flexbox,
      FlexboxItem
    },
    created () {
      this.$store.dispatch('getMyOrder')
    },
    data () {
      return {
        defaultImg: defaultImg,
        defaultImage: 'this.src="' + defaultImg + '"'
      }
    },
    computed: {
      orders () {
        let _orders = this.$store.state.applyCard.myorder
        if (_orders && _orders.length > 0) {
        }
        _orders.forEach((item) => {
          item.statusText = item.orderstate && this.getStatusText(item.orderstate) || '99'
          item.addtime = this.$moment(item.addtime).format('YYYY-MM-DD HH:mm')
        })
        return _orders
      }
    },
    methods: {
      onGoShare () {
        this.$store.state.direction = 'forward'
        window.setTimeout(() => {
          this.$store.state.direction = 'end'
        }, 300)
      },
      getStatusText (tag) {
        let statusText = {
          '30': '待支付',
          '70': '支付成功',
          '140': '待支付',
          '200': '已取消',
          '201': '已退款',
          '99': ''
        }
        return statusText[tag] || ''
      }
    }
  }
</script>
