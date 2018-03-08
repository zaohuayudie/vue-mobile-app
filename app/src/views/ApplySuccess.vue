<style lang="less">

  .xs-my-card-wrapper {
    background-color: #ffffff;
    width: 100%;
    color: #333333;
    font-size: 32px;
  }

  .xs-my-card-wrapper .apply-tip {
    text-align: center;
    padding: 30px 0 20px 0;
  }
  .xs-my-card-wrapper .apply-tip p{
    line-height: 80px;
  }
  .xs-my-card-wrapper .weui-icon.weui-icon-success{
    color: #f4413f;
    font-size: 58px;
  }

  .xs-my-card-wrapper .weui-cells__title {
    background: #eeeeee;
    line-height: 58px;
    height: 58px;
    padding-left:40px;
    font-size: 32px;
    color: #333333;
  }

  .xs-my-card-wrapper .xs-card-list-item {
    overflow: hidden;
    height: 100%;

  img {
    height: 130px;
    width: 195px;
    border-radius: 20px;
    border: none;
  }
  .weui-grids {
    padding:0 20px;
  }
  .weui-grids:after, .weui-grids:before, .weui-grid:before, .weui-grid:after {
    border: none;
  }

  .weui-grid {
    padding: 20PX 10PX;
  }

  .weui-grid__icon {
    height: 130px;
    width: 195px;
    text-align: center;
    margin: auto;
  }

  .weui-grid__label{
    font-size: 22px;
  }

  }
</style>
<template>
  <div class="xs-my-card-wrapper">
    <x-header :left-options="{showBack: false}">我的体验卡</x-header>
    <div class="xs-my-card">
      <div class="apply-tip">
        <icon type="success"></icon>
        <p>申请体验卡成功</p>
      </div>

      <div class="xs-card-list-item" v-for="(block,index) in list">
        <group-title>{{block.title}}</group-title>
        <grid :cols="3">
          <grid-item v-for="(item,i) in block.data" :label="item.name" :key="i">
            <img slot="icon" :src="item.img">
          </grid-item>
        </grid>
      </div>

      <!--<div class="xs-card-list-item">-->
      <!--<group-title>星期二</group-title>-->
      <!--<grid :cols="3">-->
      <!--<grid-item :label="'面包'+i" v-for="i in 3" :key="i">-->
      <!--<img slot="icon" src="../assets/images/bread/nice.png">-->
      <!--</grid-item>-->
      <!--</grid>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import {XHeader, Grid, GridItem, GroupTitle, Icon} from 'vux'
  export default {
    components: {
      XHeader,
      Grid,
      GridItem,
      GroupTitle,
      Icon
    },
    created () {
      this.$store.dispatch('getApplySuccess')
    },
    data () {
      return {}
    },
    computed: {
      list () {
        console.log(this.$store.state)
        return this.$store.state.applyCard.applySuccess
      },
    }
  }
</script>
