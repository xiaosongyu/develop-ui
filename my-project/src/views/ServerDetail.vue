<template>
  <div style="margin-top:10px" v-loading="loading">
    <el-button id="btn_query" type="primary" @click="refresh" class="glyphicon glyphicon-refresh"> 获取最新节点信息</el-button>
    <div id="serverDetail" class="panel panel-default" style="margin-top:10px">
      <div class="panel-heading" style="font-size:16px;color:#434343;font-weight:bold;">
        <span class="glyphicon glyphicon-th"></span> <span id="panel_head_title">采集节点详情</span>
      </div>
      <el-row style="margin:10px">
        <el-col :span="6"> <span class="label">节点名称:</span> <span>{{server.name}}</span></el-col>
        <el-col :span="6"> <span class="label">节点状态:</span> <span>{{status}}</span></el-col>
        <el-col :span="6"> <span class="label">节点地址:</span> <span>{{server.address}}</span></el-col>
      </el-row>
      <el-row style="margin:10px">
        <el-col :span="6"> <span class="label">操作系统:</span> <span>{{server.osName}}</span></el-col>
        <el-col :span="6"> <span class="label">运行时间:</span> <span>{{uptime}}</span></el-col>
        <el-col :span="6"> <span class="label">CPU核数:</span> <span>{{server.cpuCores}}</span></el-col>
        <el-col :span="6"> <span class="label">线程总数:</span> <span>{{server.threadCount}}</span></el-col>
      </el-row>
      <el-row style="margin:10px">
        <el-col :span="6"> <span class="label">剩余内存:</span> <span>{{memoryFree}}</span></el-col>
        <el-col :span="6"> <span class="label">最大内存:</span> <span>{{memoryTotal}}</span></el-col>
        <el-col :span="6"> <span class="label">作业总数:</span> <span>{{server.totalJobCount}}</span></el-col>
        <el-col :span="6"> <span class="label">更新时间:</span> <span>{{server.updateTm}}</span></el-col>
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
            <el-select v-model="search.status" placeholder="请选择">
              <el-option v-for="item in selectStates" :label="item.label" :value="item.value" :key="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="col-md-3 col-xs-6 ">
            <div class="pull-right">
              <el-button id="btn_query" type="primary" icon="search">查询
              </el-button>
              <el-button id="btn_add" type="primary" style="margin-left:10px;" icon="plus">新增
              </el-button>
            </div>
          </div>
        </div>
        <el-table :data="server.jobTable.list" border>
          <el-table-column type="expand">
            <template scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="作业名称" min-width="100">
          </el-table-column>
          <el-table-column label="状态" width="110">
            <template scope="scope">
              {{$t('job.status_'+scope.row.status)}}
            </template>
          </el-table-column>
          <el-table-column prop="readCount" label="读笔数" min-width="60">
          </el-table-column>
          <el-table-column prop="writeCount" label="写笔数" min-width="60">
          </el-table-column>
          <el-table-column prop="errorCount" label="失败笔数" min-width="60">
          </el-table-column>
          <el-table-column prop="logDate" label="最后记录时间" min-width="100">
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
        jobName: '',
        status: '',
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
      }]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.loading = true
      this.$http.post('/carteServers/detail/' + this.serverId, this.search)
        .then((response) => {
          this.server = response.data
          this.loading = false
        }).catch(function(response) {
          this.loading = false
        })
    },
    refresh() {
      this.loading = true
      this.$http.get('/carteServers/refresh/' + this.serverId)
        .then((response) => {
          this.init()
        }).catch(function(response) {
          this.loading = false
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
.label {
  color: #898989;
  text-align: right;
  font-size: 15px;
}
</style>
