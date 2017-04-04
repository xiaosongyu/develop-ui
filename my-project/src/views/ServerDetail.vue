<template>
  <div style="margin-top:10px" v-loading="loading">
    <el-button id="btn_query" type="primary" @click="refresh" class="glyphicon glyphicon-refresh"> 获取最新节点信息</el-button>
    <div id="serverDetail" class="panel panel-default" style="margin-top:10px">
      <div class="panel-heading" style="font-size:16px;color:#434343;font-weight:bold;">
        <span class="glyphicon glyphicon-th"></span> <span id="panel_head_title">采集节点详情</span>
      </div>
      <el-row style="margin:10px">
        <el-col :span="6"> <span class="labelNew">节点名称:</span> <span>{{server.name}}</span></el-col>
        <el-col :span="5"> <span class="labelNew">节点状态:</span> <span>{{status}}</span></el-col>
        <el-col :span="8"> <span class="labelNew">节点地址:</span> <span>{{server.address}}</span></el-col>
      </el-row>
      <el-row style="margin:10px">
        <el-col :span="6"> <span class="labelNew">操作系统:</span> <span>{{server.osName}}</span></el-col>
        <el-col :span="5"> <span class="labelNew">运行时间:</span> <span>{{uptime}}</span></el-col>
        <el-col :span="5"> <span class="labelNew">CPU核数:</span> <span>{{server.cpuCores}}</span></el-col>
        <el-col :span="8"> <span class="labelNew">线程总数:</span> <span>{{server.threadCount}}</span></el-col>
      </el-row>
      <el-row style="margin:10px">
        <el-col :span="6"> <span class="labelNew">剩余内存:</span> <span>{{memoryFree}}</span></el-col>
        <el-col :span="5"> <span class="labelNew">最大内存:</span> <span>{{memoryTotal}}</span></el-col>
        <el-col :span="5"> <span class="labelNew">作业总数:</span> <span>{{server.jobCount}}</span></el-col>
        <el-col :span="8"> <span class="labelNew">更新时间:</span> <span>{{server.updateTm}}</span></el-col>
      </el-row>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading" style="font-size:16px;color:#434343;font-weight:bold;">
        <span class="glyphicon glyphicon-th"></span> <span id="panel_head_title">作业列表</span>
      </div>
      <div id="tab_content" class="tab-content">
        <div class="row panel-body tab-pane fade in active">
          <div class="col-md-9 col-xs-6">
            <label>作业名称：</label>
            <el-input size="small" v-model="search.jobName"></el-input>
            <label style="padding-left:20px">状态：</label>
            <el-select v-model="search.lastRunStatus" placeholder="请选择">
              <el-option v-for="item in selectStates" :label="item.label" :value="item.value" :key="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="col-md-3 col-xs-6 ">
            <div class="pull-right">
              <el-button id="btn_query" type="primary" @click="handleSearch" icon="search">查询
              </el-button>
              <el-button id="btn_add" type="primary" @click="openJobDialog" style="margin-left:10px;" icon="plus">新增
              </el-button>
            </div>
          </div>
        </div>
        <el-table :data="server.jobTable.list" border>
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="jobName" label="作业名称" min-width="100">
          </el-table-column>
          <el-table-column prop="cronExp" label="调度时间表达式" width="160">
          </el-table-column>
          <el-table-column label="最后执行状态" width="130">
            <template scope="scope">
              {{$t('job.status_'+scope.row.lastRunStatus)}}
            </template>
          </el-table-column>
          <el-table-column prop="writeCount" label="错误信息" width="100">
          </el-table-column>
          <el-table-column prop="logDate" label="执行时间" width="180">
          </el-table-column>
          <el-table-column label="操作" width="190">
            <template scope="scope">
              <img src="/static/images/table_info.png" style="vertical-align: sub" alt="" />
              <el-button type="text" size="small" class="click" style="margin-right:3px" @click="handleDetail(scope.$index, scope.row)">详情</el-button>|
              <img src="/static/images/table_refresh.png" style="vertical-align: sub" alt="" />
              <el-button type="text" size="small" class="click" style="margin-right:3px" @click="handleRefresh(scope.$index, table.data)">执行</el-button>|
              <img src="/static/images/table_delete.png" style="vertical-align: sub" alt="" />
              <el-button type="text" size="small" class="click" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'serverDetail',
  props: {
    serverId: Number
  },
  data() {
    return {
      loading: false,
      server: {
        status: 1,
        jobTable: {
          list: [],
          total: 0
        }
      },
      search: {
        serverId: '',
        jobName: '',
        lastRunStatus: '',
        pageSize: 10,
        currentPage: 1
      },
      selectStates: [{
        value: '',
        label: this.$t('all')
      }, {
        value: 0,
        label: this.$t('job.status_0')
      }, {
        value: 8,
        label: this.$t('job.status_8')
      }, {
        value: 32,
        label: this.$t('job.status_32')
      }, {
        value: 33,
        label: this.$t('job.status_33')
      }]
    }
  },
  mounted() {
    this.search.serverId = this.serverId
    this.init()
  },
  methods: {
    init() {
      this.$http.post('/carteServers/detail/' + this.serverId, this.search)
        .then((response) => {
          this.server = response.data
        })
    },
    refresh() {
      this.$http.get('/carteServers/refresh/' + this.serverId)
        .then((response) => {
          this.init()
        })
    },
    handleSearch() {
      this.$http.post('/carteJobs', this.search)
        .then((response) => {
          this.server.jobTable.list = response.data.list
          this.loading = false
        })
    },
    handleDelete(index, row) {
      this.$http.delete('/carteJobs/' + row.id)
        .then((response) => {
          this.init()
        })
    },
    openJobDialog() {
      let job = {
        serverId: 1,
        jobName: '测试作业',
        cronExp: '0/10 * * ? ? *'
      }
      this.$http.post('/carteJobs/add', job)
        .then((response) => {
          this.handleSearch()
        })
    }
  },
  computed: {
    status: function() {
      return this.$t('server.status_' + this.server.status)
    },
    uptime: function() {
      return (this.server.uptime / 1000 / 3600).toFixed(1) + '小时'
    },
    memoryFree: function() {
      return (this.server.memoryFree / 1024 / 1024).toFixed(0) + 'M'
    },
    memoryTotal: function() {
      return (this.server.memoryTotal / 1024 / 1024).toFixed(0) + 'M'
    }
  }
}
</script>
<style scoped>
.labelNew {
  color: #898989;
  text-align: right;
}
</style>
