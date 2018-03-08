<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/tap.less';

  body {
    background-color: #eeeeee;
  }

  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
</style>
<template>
  <transition name="fade">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </transition>
</template>
<script>
  export default {
    data () {
      return {}
    },
    mounted () {

    },
    beforeDestroy () {

    },
    methods: {}
  }
</script>
