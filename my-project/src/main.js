// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-default/index.css'
import 'animate.css/animate.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import routes from './routes'
import './assets/css/framework.css'
import './assets/js/i18n'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)

var router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('user')
  }
  let user = sessionStorage.getItem('user')
  if (!user && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

/* eslint-disable no-new */
var vm = new Vue({
  /* el: '#app', */
  router: router,
  /* template: '<App/></App>', */
  /* components: { App }, */
  render: h => h(App)
})

Vue.http.interceptors.push((request, next) => {
  let loading
  var index = request.url.indexOf('api/')
  if (index !== 0) {
    if (request.url.charAt(0) === '/') {
      request.url = 'api' + request.url
    } else {
      request.url = 'api/' + request.url
    }
  }
  if (request.loading !== false) {
    loading = vm.$loading({ text: '拼命加载中', fullscreen: false })
  }
  next((response) => {
    if (!response.ok) {
      console.log(response)
      var errorMsg = vm.$t('error.unkonwn_error')
      if (response.status === 0) {
        vm.$router.push('/login')
        errorMsg = null
      } else if (response.status === 504) {
        errorMsg = vm.$t('error.server_invalid')
      } else if (response.data && Number.isInteger(response.data.resCode) && response.data.resCode !== 0) {
        errorMsg = vm.$t('error.' + response.data.resCode)
      }
      if (errorMsg) {
        vm.$alert(errorMsg, '警告', {
          confirmButtonText: '确定',
          type: 'error'
        })
      }
    }
    if (loading) {
      loading.close()
    }
    return response
  })
})

vm.$mount('#app')
