<template>
  <div class="vux-search-box" :class="{'vux-search-fixed':isFixed}"
       :style="{top: isFixed ? top : '', position: fixPosition }">
    <div class="weui-search-bar" :class="{'weui-search-bar_focusing': !isCancel || currentValue}">
      <slot name="left"></slot>
      <form class="weui-search-bar__form" @submit.prevent="$emit('on-submit', value)" action=".">
        <div class="vux-search-mask" @click="touch" v-show="!isFixed && autoFixed"></div>
        <div class="weui-search-bar__box">
          <i class="weui-icon-search"></i>
          <input type="search" class="weui-search-bar__input" :id="`search_input_${uuid}`" :placeholder="placeholder"
                 autocomplete="off" :required="required" v-model="currentValue" ref="input"
                 @focus="onFocus"
                 @blur="onBlur"/>
          <a href="javascript:" class="weui-icon-clear" @click="clear" v-show="currentValue"></a>
        </div>
        <label :for="`search_input_${uuid}`" class="weui-search-bar__label" v-show="!isFocus && !value">
          <i class="weui-icon-search"></i>
          <span>{{placeholder || $t('placeholder')}}</span>
        </label>
      </form>
      <a href="javascript:" class="weui-search-bar__cancel-btn" @click="cancel">{{cancelText || $t('cancel_text')}}</a>
      <slot name="right"></slot>
    </div>
    <div class="weui-cells vux-search_show" v-show="isFixed">
      <slot></slot>
      <div class="weui-cell weui-cell_access" v-for="item in results" @click="handleResultClick(item)">
        <div class="weui-cell__bd weui-cell_primary">
          <img src="../assets/images/loc.png">
          <p class="loc-name">{{item.name}}</p>
          <p class="loc-address">{{item.address}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
  cancel_text:
  en: cancel
  zh-CN: 取消
  placeholder:
  en: Search
  zh-CN: 搜索
</i18n>

<script>
  import uuidMixin from '../../../node_modules/vux/src/mixins/uuid'
  import {XImg} from 'vux'

  export default {
    name: 'search',
    mixins: [uuidMixin],
    props: {
      required: {
        type: Boolean,
        default: false
      },
      placeholder: String,
      cancelText: String,
      value: {
        type: String,
        default: ''
      },
      results: {
        type: Array,
        default () {
          return []
        }
      },
      autoFixed: {
        type: Boolean,
        default: true
      },
      top: {
        type: String,
        default: '0px'
      },
      position: {
        type: String,
        default: 'fixed'
      },
      autoScrollToTop: Boolean
    },
    components: {
      XImg
    },
    created () {
      if (this.value) {
        this.currentValue = this.value
      }
    },
    computed: {
      fixPosition () {
        if (this.isFixed) {
          return this.position === 'absolute' ? 'absolute' : 'fixed'
        }
        return 'static'
      }
    },
    methods: {
      $t (txt) {
        let text = {
          placeholder: '',
          cancel_text: '取消'
        }
        return text[txt]
      },
      clear () {
        this.currentValue = ''
        this.isFocus = true
        this.setFocus()
        if (this.autoFixed && !this.isFixed) {
          this.isFixed = true
        }
      },
      cancel () {
        this.isCancel = true
        this.currentValue = ''
        this.isFixed = false
        this.$emit('on-cancel')
      },
      handleResultClick (item) {
        this.$emit('result-click', item) // just for compatibility
        this.$emit('on-result-click', item)
        this.isCancel = true
        this.isFixed = false
      },
      touch () {
        this.isCancel = false
        if (this.autoFixed) {
          this.isFixed = true
        }
        this.$emit('on-touch')
      },
      setFocus () {
        this.$refs.input.focus()
      },
      setBlur () {
        this.$refs.input.blur()
        this.$emit('on-blur')
      },
      onFocus () {
        this.isFocus = true
        this.$emit('on-focus')
        this.touch()
      },
      onBlur () {
        this.isFocus = false
      }
    },
    data () {
      return {
        currentValue: '',
        isCancel: true,
        isFocus: false,
        isFixed: false
      }
    },
    watch: {
      isFixed (val) {
        if (val === true) {
          this.setFocus()
          this.isFocus = true

          if (this.autoScrollToTop) {
            setTimeout(() => {
              window.scrollTo(0, 0)
            }, 150)
          }
        } else {
        }
      },
      value (val) {
        this.currentValue = val
      },
      currentValue (val) {
        this.$emit('input', val)
        this.$emit('on-change', val)
      }
    }
  }
</script>

<style lang="less">
  /*@import '../../../node_modules/vux/src/styles/weui/icon/weui_icon_font';*/
  @import '../../../node_modules/vux/src/styles/weui/widget/weui_searchbar/weui_searchbar';
  @import '../../../node_modules/vux/src/styles/weui/widget/weui_cell/weui_cell_global';
  @import '../../../node_modules/vux/src/styles/weui/widget/weui_cell/weui_access';

  .vux-search-fixed {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 5;
    background: rgba(255, 255, 255, 1);
    backdrop-filter: blur(5px);
  }

  .vux-search-box {
    width: 100%;

    .weui-search-bar__input {
      font-size: 28px;
    }

  }
  .weui-search-bar {
    background-color: #ffffff;
  .weui-search-bar__form{
    background-color: #ffffff;
  }
  .weui-search-bar__box {
    background: #eeeeee;
    border-radius: 30px;
    height:70px;
  }
  .weui-search-bar__label{
    background-color: #eeeeee;
    height:70px;
  }
  }

  .weui-cells.vux-search_show {
    margin-top: 6px !important;
    overflow-y: auto;
    position: fixed;
    width: 100%;
    max-height: 100%;

    .weui-cell:last-child {
      margin-bottom: 150px;
    }
  .weui-cell:before{
      &:first-child{
        border-top:none;
       }
    }

    &::-webkit-scrollbar {
      display: none;
    }

    &::after {
      display: none;
    }

  }

  .vux-search-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 90%;
    height: 100%;
    z-index: 5;
  }

  .vux-search-box .weui-cell:before {
    border-top: 1PX solid #D9D9D9;
  }

  .weui-cells.vux-search_show .weui-cell_primary {
    height: 80px;
    padding-top: 10px;

    p {
      line-height: 30px;
    }

  }

  .weui-cells.vux-search_show .weui-cell_primary img {
    float: left;
    height: 30px;
    width: 24px;
    margin: 20px 16px 0 10px;
  }

  .weui-cells.vux-search_show .loc-name {
    font-size: 28px;
  }

  .weui-cells.vux-search_show .loc-address {
    color: #999999;
    font-size: 20px;
    display: block;
    margin-top: 10px;
  }
</style>
