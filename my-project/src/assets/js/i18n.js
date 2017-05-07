import Vue from 'vue'
import VueI18n from 'vue-i18n'

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
    1003: '节点无法连接',
    2001: '作业名称已存在',
    2002: '无效的时间表达式',
    3002: '执行失败',
    3003: '作业正在执行，无法重复执行作业',
    3004: '无法获取作业执行日志,请稍后再试',
    9001: '用户名或密码不正确'
  },
  'folder': '文件夹',
  'job': '作业',
  'transformation': '转换',
  'confirm_delete': '此操作将永久删除记录，是否继续?'
}

Vue.locale('zh-cn', data)
