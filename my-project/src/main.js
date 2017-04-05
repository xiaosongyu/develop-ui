// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import Home from './views/Home'
import Hello from './views/Hello'
import TreeView from './components/TreeView'
import VueResource from 'vue-resource'
import VueI18n from 'vue-i18n'
import 'element-ui/lib/theme-default/index.css'
import 'animate.css/animate.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/framework.css'

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
  },
  job_obj: {
    status_0: '未开始',
    status_8: '执行中',
    status_32: '完成',
    status_33: '完成(错误)'
  },
  error: {
    1002: '节点名称已存在',
    2001: '作业名称已存在'
  },
  'folder': '文件夹',
  'job': '作业',
  'transformation': '转换'
}

Vue.locale('zh-cn', data)

var router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/hello', component: Hello },
    { path: '/repository', component: TreeView }
  ]
})

var vm = new Vue({
  el: '#app',
  router: router,
  template: '<App/></App>',
  components: { App }
})

Vue.http.interceptors.push((request, next) => {
  let loading = vm.$loading({ text: '拼命加载中', fullscreen: false })
  next((response) => {
    if (!response.ok) {
      var errorMsg = '系统错误，请联系管理员'
      if (Number.isInteger(response.data)) {
        errorMsg = vm.$t('error.' + response.data)
      }
      vm.$alert(errorMsg, '警告', {
        confirmButtonText: '确定',
        type: 'error'
      })
    }
    loading.close()
    return response
  })
})
