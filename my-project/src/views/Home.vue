<template>
  <el-tabs v-model="tabValue" type="card" @tab-remove="removeTab">
    <el-tab-pane>
      <span slot="label"><i class="el-icon-date"></i> 采集节点监控管理</span>
      <server-list></server-list>
    </el-tab-pane>
    <el-tab-pane v-for="(item, index) in tabs" :label="item.title" :name="item.name" :key="item.name" closable>
      <component v-bind:is="item.view"></component>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import ServerList from './ServerList'
import Hello from './Hello'

export default {
  name: 'home',
  components: {
    'server-list': ServerList,
    'hello': Hello
  },
  data() {
    return {
      tabValue: '',
      tabs: [{
        title: '节点详情',
        name: '1',
        view: 'hello'
      }, {
        title: '节点详情',
        name: '2',
        view: 'hello'
      }],
      tabIndex: 2
    }
  },
  methods: {
    removeTab(targetName) {
      let tab2 = this.tabs
      let activeName = this.tabValue
      if (activeName === targetName) {
        tab2.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tab2[index + 1] || tab2[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.tabValue = activeName
      this.tabs = tab2.filter(tab => tab.name !== targetName)
    }
  }
}
</script>
<style scoped>
</style>
