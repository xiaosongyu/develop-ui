<template>
  <el-tabs v-model="tabValue" type="card" @tab-remove="removeTab">
    <el-tab-pane name="0">
      <span slot="label"><i class="el-icon-date"></i> 采集节点监控管理</span>
      <server-status v-on:detail="handleDetail"></server-status>
    </el-tab-pane>
    <el-tab-pane v-for="(item, index) in tabs" :label="item.title" :name="item.key" :key="item.key" closable>
      <component v-bind:is="item.view" :serverId="Number(item.key)"></component>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import ServerStatus from './ServerStatus'
import ServerDetail from './ServerDetail'

export default {
  name: 'home',
  components: {
    'server-status': ServerStatus,
    'server-detail': ServerDetail
  },
  data() {
    return {
      tabValue: '0',
      tabs: []
    }
  },
  methods: {
    handleDetail(id, name) {
      let newId = id + ''
      for (var i = 0, l = this.tabs.length; i < l; i++) {
        if (this.tabs[i].key === newId) {
          this.tabValue = newId
          return
        }
      }
      this.tabs.push({
        title: name,
        key: newId,
        view: 'server-detail'
      })
      this.tabValue = newId
    },
    removeTab(key) {
      let name = key + ''
      let tab2 = this.tabs
      let activeName = this.tabValue
      if (activeName === name) {
        tab2.forEach((tab, index) => {
          if (tab.key === name) {
            let nextTab = tab2[index + 1] || tab2[index - 1]
            if (nextTab) {
              activeName = nextTab.key + ''
            }
          }
        })
      }
      this.tabs = tab2.filter(tab => tab.key !== name)
      if (this.tabs.length > 0) {
        this.tabValue = activeName
      } else {
        this.tabValue = '0'
      }
    }
  }
}
</script>
<style scoped>
</style>
