/**
 * Created by antianlu on 2017/5/3.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history', // "hash" | "history" | "abstract"
  base: process.env.PUBLIC_URL || '/',
  routes: routes
})
