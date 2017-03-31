<template>
  <div class="row">
    <div class="panel">
      <div class="col-sm-3 panel-block">
        <wn-block-chart img="/static/images/total_state.png" :value="chart.totalCount" fontColor="#6FDE6F">总节点</wn-block-chart>
      </div>
      <div class="col-sm-3 panel-block">
        <wn-block-chart img="/static/images/normal_state.png" :value="chart.normalCount" fontColor="#FFA248">正常</wn-block-chart>
      </div>
      <div class="col-sm-3 panel-block">
        <wn-block-chart img="/static/images/abnormal_state.png" :value="chart.abnormalCount" fontColor="#C698F5">采集异常</wn-block-chart>
      </div>
      <div class="col-sm-3 panel-block">
        <wn-block-chart img="/static/images/disconnect_state.png" :value="chart.disConnCount" fontColor="#57D2DD">未连接</wn-block-chart>
      </div>
      <div class="col-sm-12">
        <wn-common-search v-on:change="init"></wn-common-search>
      </div>
    </div>
  </div>
</template>
<script>
import StateBlockChart from '../components/StateBlockChart'
import CommonSearch from '../components/CommonSearch'

export default {
  name: 'home',
  components: {
    'wn-block-chart': StateBlockChart,
    'wn-common-search': CommonSearch
  },
  data() {
    return {
      chart: {
        totalCount: 0,
        normalCount: 0,
        abnormalCount: 0,
        disConnCount: 0
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.$http.get('/carteServers/chart')
        .then((response) => {
          this.chart = response.data
        })
    }
  }

}
</script>
<style scoped>
.panel {
  padding-top: 15px;
}
</style>
