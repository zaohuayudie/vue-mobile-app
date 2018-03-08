const path = require('path')
const utils = require('./utils')
const wpConfig = require('../index')
const vueLoaderConfig = require('./vue-loader.conf')
const eslintFriendlyFormatter = require('eslint-friendly-formatter')
const vuxLoader = require('vux-loader')

function resolve(dir) {
  return path.join(__dirname, '..', '..', dir)
}

const webpackConfig = {
  entry: {
    app: resolve('src/main.js')
  },
  output: {
    path: wpConfig.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV !== 'development'
      ? wpConfig.build.assetsPublicPath
      : wpConfig.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'assets': utils.sourcePath('assets'),
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: eslintFriendlyFormatter
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      // {
      //   test: /\.(less|css)$/,
      //   use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader'],
      //   include: [resolve('src')]
      // },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
/**
 * duplicate-style:构建后去除重复css代码
 * vux-ui:配置babel-loader以正确编译 VUX 的js源码
 */
module.exports = vuxLoader.merge(webpackConfig, {
  plugins: [
    {
      name: 'vux-ui'
    },
    {
      name: 'duplicate-style',
      // options: {
      //   canPrint: true
      // }
    },
    {
      name: 'less-theme',
      path: resolve('src/theme.less')
    },
    {
      name: 'after-less-parser',
      fn: function (source) {
        if (this.resourcePath.replace(/\\/g, '/').indexOf('/vux/src/components') > -1) {
          source = source.replace(/px/g, 'PX')
        }
        // 自定义的全局样式大部分不需要转换
        if (this.resourcePath.replace(/\\/g, '/').indexOf('App.vue') > -1) {
          source = source.replace(/px/g, 'PX').replace(/-1PX/g, '-1px')
        }
        return source
      }
    },
    {
      name: 'style-parser',
      fn: function (source) {
        if (this.resourcePath.replace(/\\/g, '/').indexOf('/vux/src/components') > -1) {
          source = source.replace(/px/g, 'PX')
        }
        // 避免转换1PX.less文件路径
        if (source.indexOf('1PX.less') > -1) {
          source = source.replace(/1PX.less/g, '1px.less')
        }
        return source
      }
    }
  ]
})
