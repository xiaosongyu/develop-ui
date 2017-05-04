// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import Home from './views/Home'
import Hello from './views/Hello'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-default/index.css'
import 'animate.css/animate.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/framework.css'
import './assets/js/i18n'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)

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
  template: '<App/></App>',
  components: { App },
  created() {
    Vue.http.interceptors.push((request, next) => {
      let loading
      var index = request.url.indexOf('api/')
      if (index !== 0) {
        request.url = 'api/' + request.url
      }
      if (request.loading !== false) {
        loading = this.$loading({ text: '拼命加载中', fullscreen: false })
      }
      next((response) => {
        if (!response.ok) {
          var errorMsg = '系统错误，请联系管理员'
          if (Number.isInteger(response.data.errorCode) && response.data.errorCode !== 0) {
            errorMsg = this.$t('error.' + response.data.errorCode)
          }
          this.$alert(errorMsg, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        }
        if (loading) {
          loading.close()
        }
        return response
      })
    })
  }
})
