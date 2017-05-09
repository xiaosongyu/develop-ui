<template>
  <el-dialog id="history" :title="'作业执行明细('+jobName+')'" size="large" top="1%" :visible.sync="visible" :close-on-click-modal="false" :before-close="handleClose">
    <el-tabs v-model="tabValue" type="card" @tab-click="tabClick">
      <el-tab-pane v-for="(item, index) in historys" :label="item.date" :key="item.date">
        <div v-if="item.table==null||item.table.total==0" class="history" style="margin:1em;text-align:center">无执行记录</div>
        <div v-else>
          <el-collapse v-model="activeName[index]" accordion @change="getLogText">
            <el-collapse-item :name="index" v-for="(item, index) in item.table.list" :key="item.id">
              <template slot="title">
                状态:<span class="history">{{$t('job_obj.status_'+item.status)}}</span>
                <span style="margin:15px">|</span>
                <span>开始时间:</span><span class="history">{{item.startTm}}</span>
                <span style="margin:15px">|</span>
                <span>结束时间:</span><span class="history">{{item.endTm}}</span>
                <div class="pull-right">
                  <el-button v-if="item.finished==0" class="glyphicon glyphicon-refresh" type="primary" style="margin:1px 10px 1px 10px" @click.stop.prevent="refreshLog(item.id,index)">
                    刷新</el-button>
                  <el-button type="primary" style="margin:1px 4px 1px 0px" @click.stop.prevent="logExport(item.id)">
                    导出日志</el-button>
                </div>
              </template>
              <el-input type="textarea" :autosize="{maxRows: 8}" v-model="item.logText" readonly v-loading.body="loading" placeholder="暂无数据"></el-input>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div style="text-align: center;padding:12px">
          <el-pagination v-if="item.table&&item.table.total>0" layout="total,prev, pager, next" :total="item.table==null?0:item.table.total" :page-size="pageSize" @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleClose">退出</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'jobHistoryDialog',
  data() {
    return {
      visible: false,
      request: {
        loading: false
      },
      loading: false,
      jobName: '',
      activeName: [],
      tabValue: '0',
      historys: [],
      dayNum: 8,
      jobId: 0,
      pageSize: 5,
      sort: 'startTm|desc',
      page: []
    }
  },
  methods: {
    open() {
      this.activeName = []
      this.visible = true
    },
    init(jobId, jobName) {
      this.jobId = jobId
      this.jobName = jobName
      this.tabValue = '0'
      this.page = new Array(1)
      this.$http.get('/jobHistory/dayList/' + this.dayNum)
        .then((response) => {
          this.historys = response.data
          this.searchDetail()
        })
    },
    getLogText(activeName) {
      var historyList = this.historys[this.tabValue].table.list
      if (!Number.isInteger(activeName) || !historyList || historyList.length < activeName + 1) {
        return
      }
      var logxText = this.historys[this.tabValue].table.list[activeName].logText
      if (logxText) {
        return
      }
      var logId = this.historys[this.tabValue].table.list[activeName].id
      this.loading = true
      this.$http.get('/jobHistory/log/' + logId, this.request)
        .then((response) => {
          this.historys[this.tabValue].table.list[activeName].logText = response.data
          this.loading = false
        }).catch(function(response) {
          this.loading = false
        })
    },
    refreshLog(logId, activeName) {
      this.loading = true
      this.$http.get('/jobHistory/refresh/' + logId, this.request)
        .then((response) => {
          this.historys[this.tabValue].table.list.splice(activeName, 1, response.data)
          this.loading = false
        }).catch(function(response) {
          this.loading = false
        })
    },
    logExport(logId) {
      alert('导出功能暂不支持')
    },
    searchDetail() {
      if (!this.page[this.tabValue]) {
        this.page[this.tabValue] = {
          currentPage: 1
        }
      }
      var search = {
        date: this.historys[this.tabValue].date,
        jobId: this.jobId,
        pageSize: this.pageSize,
        sort: this.sort,
        currentPage: this.page[this.tabValue].currentPage
      }
      this.$http.post('/jobHistory/detail/', search)
        .then((response) => {
          this.historys[this.tabValue].table = response.data
        })
    },
    handleCurrentChange(val) {
      this.page[this.tabValue].currentPage = val
      this.activeName = []
      this.searchDetail()
    },
    tabClick(tab, event) {
      if (this.page[this.tabValue]) {
        return
      }
      this.searchDetail()
    },
    handleClose(done) {
      this.visible = false
    }
  }
}
</script>
<style>
#history .el-collapse-item__content {
  padding: 1px;
}

#history .el-textarea__inner {
  font-size: 0.8em;
}

#history .el-textarea__inner {
  border: 1.5px solid #0079f4;
}

.history {
  font-weight: bold
}
</style>
