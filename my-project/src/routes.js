import Hello from './views/Hello'
import Home from './views/Home'
import Login from './components/Login'
import Frame from './components/Frame'

let routes = [{
  path: '/',
  redirect: '/frame/home',
  hidden: true
}, {
  path: '/login',
  component: Login,
  hidden: true
}, {
  path: '/frame',
  component: Frame,
  name: '采集节点管理',
  icon: 'el-icon-menu',
  children: [
    { path: '/frame/home', component: Home, name: '采集监控管理', icon: 'el-icon-view' },
    { path: '/frame/config', component: Hello, name: '配置仓库', icon: 'el-icon-picture' }
  ]
}, {
  path: '/frame',
  component: Frame,
  name: '',
  leaf: true,
  icon: 'el-icon-setting',
  children: [
    { path: '/frame/setting', component: Hello, name: '设置' }
  ]
}, {
  path: '/frame',
  component: Frame,
  name: '',
  leaf: true,
  icon: 'el-icon-menu',
  children: [
    { path: '/frame/help', component: Hello, name: '帮助' }
  ]
}]

export default routes
