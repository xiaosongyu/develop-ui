import Hello from './views/Hello'
import Home from './views/Home'
import Login from './components/Login'
import Frame from './components/Frame'

let routes = [
  { path: '/', redirect: '/frame/home' },
  { path: '/login', component: Login }, {
    path: '/frame',
    component: Frame,
    children: [
      { path: '/frame/home', component: Home },
      { path: '/frame/hello', component: Hello }
    ]
  }
]

export default routes
