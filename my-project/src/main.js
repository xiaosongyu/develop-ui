// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import Home from './views/Home'
import Hello from './views/Hello'
import VueResource from 'vue-resource'
import VueI18n from 'vue-i18n'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueI18n)
Vue.config.lang = 'zh-cn'

const data = {
  'all': '全部',
  server: {
    status_1: '未连接',
    status_2: '正常',
    status_4: '采集异常'
  }
}

Vue.locale('zh-cn', data)

var router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/hello', component: Hello }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App }
})
