import Vue from 'vue'
import Router from 'vue-router'
import router from './router'
Vue.use(Router)

let routers = new Router({
  routes: router,
  // mode: 'history',
  mode: 'hash'
})

routers.beforeEach((to, from, next) => {
  next();
})
export default routers
