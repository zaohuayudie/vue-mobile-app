<template>
  <div class="xs-search-container">
    <x-header class="header" title="地址搜索"/>
    <!--<el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>-->
    <!--<img src="../assets/images/banner.jpg" style="width: 100%">-->

    <address-search
      class="xs-search-box"
      cancel-text=""
      @result-click="resultClick"
      @on-change="getResult"
      :results="results"
      v-model="value"
      position="absolute"
      auto-scroll-to-top
      top="46px"
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search">
      <div slot="default" v-show="noData">{{noData}}</div>
    </address-search>
  </div>
</template>

<script>
  import VueAMap from 'vue-amap';
  import {Group, Cell, XButton, XHeader} from 'vux'
  import AddressSearch from '../components/AddressSearch.vue'

  export default {
    components: {
      XHeader,
      AddressSearch,
      Group,
      Cell,
      XButton
    },
    methods: {
      setFocus () {
        this.$refs.search.setFocus()
      },
      resultClick (item) {
        this.$store.state.applyForm.deliveryAddress = item.address
        this.$store.state.applyForm.lat = item.location.lat
        this.$store.state.applyForm.lng = item.location.lng
        this.$router.push({
          path: '/card/apply'
        })
        this.$store.state.direction = 'end'
//        window.alert('you click the result item: ' + JSON.stringify(item))
      },
      getResult (val) {
        this.results = val ? this.keyUpSearch(this.value) : []
      },
      onSubmit () {
        this.$refs.search.setBlur()
//        this.$vux.toast.show({
//          type: 'text',
//          position: 'top',
//          text: 'on submit'
//        })
      },
      onFocus () {
        console.log('on focus')
      },
      onCancel () {
        console.log('on cancel')
      },
      keyUpSearch (val) {
        //let txt = this.$refs.searchText.value;
        let self = this;
        AMap.service(["AMap.PlaceSearch"], function () {
          let placeSearch = new AMap.PlaceSearch({
            //构造地点查询类
            pageSize: 10,
            pageIndex: 1,
            city: '北京', //城市
            cityLimit: true
//            panel: 'temp'//搜索结果的展示面板对元素id，不知道为什么一定要有该参数，最终获取的结果才更完整，参数更多跟完整，
//所以我在页面随便写了一个<div id="temp" style="display:none"></div>
          });
          //关键字查询
          placeSearch.search(val, (status, result) => {
            if (status === 'complete' && result.info === 'OK') {
              //这里可以console.log(result)，查看所有返回的参数，遍历展示这些基本的，我就不赘述
              //_this.searchData = result.poiList.pois
              if (result.poiList.pois && result.poiList.pois.length) {
                let rs = []
                self.noData = ''
//                console.log(result.poiList.pois)
                result.poiList.pois.forEach((item, i) => {
                  rs.push({
                    name: item.name,
                    address: item.address,
                    location: item.location,
                    other: `${i}`
                  })
                })
                self.results = rs
              } else {
                self.noData = '没有数据'
              }
            } else {
              self.noData = '没有数据'
            }
          })
        })
      }
    },
    data () {
      return {
        noData: '',
        results: [],
        value: '',
        searchOption: {
          city: '北京',
          citylimit: true
        }
      }
    }
  }
</script>

<style>

  .xs-search-box.vux-search-box .weui-search-bar {
    height: 60PX;
    padding: 18px 40px;
  }

  .xs-search-container {
    background-color: #eeeeee;
    height: 100%;
  }

  .xs-search-box .weui-search-bar__form:after {
    border-radius: 50px;
  }

  .xs-search-container .weui-search-bar__label * {
    position: relative;
    top: -20px;
  }

  .xs-search-container .weui-search-bar__box .weui-icon-search,
  .xs-search-container .weui-search-bar__box .weui-icon-clear {
    top: 22px;
  }

  .xs-search-container .weui-search-bar__cancel-btn {
    top: 16px;
    position: relative;
  }

  .xs-search-container .weui-search-bar__cancel-btn {
    font-size: 24px;
  }

  .xs-search-container .weui-search-bar__label {
    border-radius: 50px;
  }

  .xs-search-container .weui-search-bar__box .weui-search-bar__input {
    padding-left: 20px;
    /*height: 60px;*/
    position: relative;
    top: -26px;
  }
</style>
