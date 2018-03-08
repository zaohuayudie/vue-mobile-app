<style>
  .weui-tabbar {
    /*height: 98px;*/
    /*text-align: center;*/

    /*line-height: 98px;*/
  }

  .xs-tabbar-menu .weui-tabbar {
    position: fixed;
  }
</style>
<template>
  <div>
    <transition name="fade">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>

  </div>
</template>

<script>
  import {Tabbar, TabbarItem} from 'vux'
  export default {
    components: {
      Tabbar,
      TabbarItem
    },
    data () {
      return {
        selected: 'experience_card'
      }
    },
    methods: {
      onIndexChange (newIndex, oldIndex) {
        console.log(newIndex, oldIndex)
      }
    }
  }
</script>
