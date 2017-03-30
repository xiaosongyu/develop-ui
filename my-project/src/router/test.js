import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

let routes = [{
  method: 'GET',
  url: '/select/serverStats',
  response: [{
    value: '1',
    label: '未连接'
  }, {
    value: '2',
    label: '正常'
  }, {
    value: '3',
    label: '采集异常'
  }]
}, {
  method: 'GET',
  url: '/carteServers/refresh/1',
  response: {
    id: 1,
    name: '新华山医院',
    address: '192.168.1.1:9080',
    status: '未连接',
    updateTm: '2016-01-02 19:16:07',
    jobCount: 20
  }
}, {
  method: 'GET',
  url: '/carteServers',
  response: {
    total: 4,
    list: [{
      id: 1,
      name: '华山医院',
      address: '192.168.1.1:9080',
      status: '未连接',
      updateTm: '2016-05-02 19:16:07',
      jobCount: 10
    }, {
      id: 2,
      name: '华山医院',
      address: '192.168.1.1:9080',
      status: '正常',
      updateTm: '2016-05-02 19:16:07',
      jobCount: 10

    }, {
      id: 3,
      name: '华山医院',
      address: '192.168.1.1:9080',
      status: '采集异常',
      updateTm: '2016-05-02 19:16:07',
      jobCount: 10

    }, {
      id: 4,
      name: '华山医院',
      address: '192.168.1.1:9080',
      status: '未连接',
      updateTm: '2016-05-02 19:16:07',
      jobCount: 10
    }]
  }
}]

Vue.http.interceptors.unshift((request, next) => {
  let route = routes.find((item) => {
    return (request.method === item.method && request.url === item.url)
  })
  if (!route) {
    // we're just going to return a 404 here, since we don't want our test suite making a real HTTP request
    next(request.respondWith({ status: 404, statusText: 'Oh no! Not found!' }))
  } else {
    next(
      request.respondWith(
        route.response, { status: 200 }
      )
    )
  }
})

export default ({
  name: 'test'
})
