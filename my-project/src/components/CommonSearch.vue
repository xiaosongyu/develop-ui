<template>
  <div class="panel panel-default">
    <div class="panel-heading" style="font-size:16px;color:#434343;font-weight:bold;">
      <span class="glyphicon glyphicon-th"></span> <span id="panel_head_title">采集节点列表</span>
    </div>
    <div id="tab_content" class="tab-content">
      <div class="row panel-body tab-pane fade in active">
        <div class="col-md-9 col-xs-6">
          <label>节点名称：</label>
          <el-input v-model="search.name" size="small"></el-input>
          <label style="padding-left:20px">状态：</label>
          <el-select v-model="search.status" placeholder="请选择">
            <el-option v-for="item in selectStates" :label="item.label" :value="item.value" :key="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="col-md-3 col-xs-6 ">
          <div class="pull-right">
            <el-button id="btn_query" type="danger" @click="searchTable()" icon="search">查询
            </el-button>
            <el-button id="btn_add" type="danger" style="margin-left:10px;" icon="plus">新增
            </el-button>
          </div>
        </div>
      </div>
      <div class="first">
        <el-table :data="table.data" border>
          <el-table-column type="expand">
            <template scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="节点名称" min-width="100">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="160">
          </el-table-column>
          <el-table-column prop="status" label="状态" width="110">
          </el-table-column>
          <el-table-column prop="jobCount" label="作业总数" width="90" align="right">
          </el-table-column>
          <el-table-column label="更新时间" width="180" prop="updateTm">
          </el-table-column>
          <el-table-column label="操作" width="190">
            <template scope="scope">
              <img src="/static/images/table_info.png" style="vertical-align: sub" alt="" />
              <el-button type="text" size="small" class="click" style="margin-right:3px" @click="handleDetail(scope.$index, scope.row)">详情</el-button>|
              <img src="/static/images/table_refresh.png" style="vertical-align: sub" alt="" />
              <el-button type="text" size="small" class="click" style="margin-right:3px" @click="handleRefresh(scope.$index, table.data)">刷新</el-button>|
              <img src="/static/images/table_delete.png" style="vertical-align: sub" alt="" />
              <el-button type="text" size="small" class="click" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center;padding:12px">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 15, 20,50]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="table.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'common-search',
  data() {
    return {
      search: {
        name: '',
        status: '',
        pageSize: 10,
        currentPage: 1
      },
      selectStates: [],

      table: {
        data: [],
        total: 0
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.error = this.post = null
      this.loading = true
        /* get select for server status */
      this.$http.get('/select/serverStats')
        .then((response) => {
          this.selectStates = response.data
        })
      this.searchTable()
    },
    handleRefresh(index, rows) {
      this.$http.get('/carteServers/refresh/' + rows[index].id)
        .then((response) => {
          rows.splice(index, 1, response.data)
        })
    },
    handleDelete(index, row) {
      this.$http.delete('/carteServers/' + row.id)
        .then((response) => {
          this.searchTable()
        })
    },
    searchTable() {
      /* get default table data */
      this.$http.post('/carteServers', this.search)
        .then((response) => {
          this.table.total = response.data.total
          this.table.data = response.data.list
        })
    },
    handleSizeChange(val) {
      this.search.pageSize = val
      this.searchTable()
    },
    handleCurrentChange(val) {
      this.search.currentPage = val
      this.searchTable()
    }
  }

}
</script>
<style scoped>
.panel {
  padding-top: 0px;
  margin-top: 15px
}

.el-input {
  width: initial;
  padding-left: 5px;
}

.click {
  cursor: pointer;
  color: black
}
</style>
