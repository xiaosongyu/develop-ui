<template>
  <div style="margin-top:10px">
    <el-button id="btn_query" type="primary" @click="refresh" style="margin:2px 15px 2px 2px" class="glyphicon glyphicon-refresh pull-right">获取最新节点信息</el-button>
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
          <el-table-column type="expand">
            <template scope="prop">
              <el-row style="margin:10px">
                <el-col :span="10"> <span class="labelNew">作业路径:</span> <span>{{prop.row.path}}</span></el-col>
                <el-col :span="5"> <span class="labelNew">作业描述:</span> <span>{{prop.row.jobDesc}}</span></el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column prop="jobName" label="作业名称" min-width="100">
          </el-table-column>
          <el-table-column prop="cronExp" label="执行时间表达式" width="160">
          </el-table-column>
          <el-table-column label="当前状态" width="130">
            <template scope="scope">
              {{$t('job_obj.status_'+scope.row.lastRunStatus)}}
            </template>
          </el-table-column>
          <el-table-column prop="carteJobId" label="远程节点标识" width="295">
          </el-table-column>
          </el-table-column>
          <el-table-column label="操作" width="190">
            <template scope="scope">
              <img src="/static/images/table_info.png" style="vertical-align: sub" alt="" />
              <el-button type="text" size="small" class="click" style="margin-right:3px" @click="handleDetail(scope.$index, scope.row)">详情</el-button>|
              <img src="/static/images/table_refresh.png" style="vertical-align: sub" alt="" />
              <el-button type="text" size="small" class="click" style="margin-right:3px" @click="handleExecution(scope.$index,scope.row)">执行</el-button>|
              <img src="/static/images/table_delete.png" style="vertical-align: sub" alt="" />
              <el-button type="text" size="small" class="click" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center;padding:12px">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 15, 20,50]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="server.jobTable.total">
          </el-pagination>
        </div>
      </div>
    </div>
    <job-dialog ref="jobDialog" :serverId="serverId" v-on:save="handleAdd"></job-dialog>
    <job-history-dialog ref="jobHistoryDialog"></job-history-dialog>
  </div>
</template>
<script>
import JobDialog from '../views/JobDialog'
import JobHistoryDialog from '../views/JobHistoryDialog'

export default {
  name: 'serverDetail',
  components: {
    'job-dialog': JobDialog,
    'job-history-dialog': JobHistoryDialog
  },
  props: {
    serverId: Number
  },
  data() {
    return {
      jobId: 0,
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
        sort: 'id|asc',
        pageSize: 10,
        currentPage: 1
      },
      selectStates: [{
        value: '',
        label: this.$t('all')
      }, {
        value: 0,
        label: this.$t('job_obj.status_0')
      }, {
        value: 8,
        label: this.$t('job_obj.status_8')
      }, {
        value: 32,
        label: this.$t('job_obj.status_32')
      }, {
        value: 33,
        label: this.$t('job_obj.status_33')
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
        })
    },
    handleExecution(index, row) {
      this.$http.post('/carteJobs/run/' + row.id)
        .then((response) => {
          this.$alert('开始执行', '执行结果', {
            confirmButtonText: '确定',
            type: 'success'
          })
          this.handleSearch()
        })
    },
    handleDetail(index, row) {
      this.$refs.jobHistoryDialog.init(row.id, row.jobName)
      this.$refs.jobHistoryDialog.open()
    },
    handleDelete(index, row) {
      this.$confirm(this.$t('confirm_delete'), '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('/carteJobs/' + row.id)
          .then((response) => {
            this.init()
          })
      })
    },
    openJobDialog(index, row) {
      this.$refs.jobDialog.open()
    },
    handleAdd() {
      this.handleSearch()
    },
    handleSizeChange(val) {
      this.search.pageSize = val
      this.handleSearch()
    },
    handleCurrentChange(val) {
      this.search.currentPage = val
      this.handleSearch()
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
