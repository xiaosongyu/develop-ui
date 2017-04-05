<template>
  <el-dialog :title="'新增作业'+step" ref="dialog">
    <el-popover ref="popover1" placement="top-start" title="例子" width="200" trigger="hover" content="0 0 12 * * ? (每天中午12点触发)">
    </el-popover>
    <div v-show="show">
      <el-row style="margin:5px">
        <el-col :span="7">
          <div id="panel" style="border:5px solid #d1dbe5">
            <el-tree :data="tree" :props="defaultProps" @node-click="handleNodeClick" style="height:250px"></el-tree>
          </div>
        </el-col>
        <el-col :span="17">
          <div id="panel" style="border:5px solid #d1dbe5;margin-left:5px">
            <el-table :data="items" border style="height:250px" highlight-current-row @current-change="handleCurrentChange">
              <el-table-column label="名称" min-width="140">
                <template scope="scope">
                  <div :class="scope.row.class">
                    {{scope.row.name}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="type" label="类型" width="100">
                <template scope="scope">
                  {{$t(scope.row.type)}}
                </template>
              </el-table-column>
              <el-table-column prop="updateTm" label="修改时间" width="170">
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-show="!show" style="margin:10px" label-position="right">
      <el-form :model="form" ref="form">
        <el-form-item label="作业路径" style="margin-left:42px">
          <el-input v-model="form.jobPath" size="small" disabled style="width:230px!important"></el-input>
        </el-form-item>
        <el-form-item label="作业名称" style="margin-left:42px">
          <el-input v-model="form.jobName " size="small" style="width:230px!important"></el-input>
        </el-form-item>
        <el-form-item label="执行时间表达式">
          <el-input v-model="form.cronExp" size="small" style="width:230px!important"></el-input>
          <i class="el-icon-information" v-popover:popover1></i>
        </el-form-item>
        <el-form-item label="描述" style="margin-left:75px">
          <el-input v-model="form.jobDesc" size="small" type="textarea" :rows="2"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary " @click="next" v-show="show" :disabled="nextDisable">下一步</el-button>
      <el-button type="primary " @click="back" v-show="!show">上一步</el-button>
      <el-button type="primary " @click="save" v-show="!show">保存</el-button>
      <el-button type="primary " @click="close">退出</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'jobDialog',
  data() {
    return {
      nextDisable: true,
      show: true,
      currentPath: {
        path: '/'
      },
      tree: [{
        label: '/',
        children: []
      }],
      items: [],
      form: {
        jobName: '',
        cronExp: '',
        jobDesc: ''
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      currentRow: null
    }
  },
  methods: {
    getDirTree() {
      this.$http.get('/carteJobs/repository')
        .then((response) => {
          this.tree = response.data
          this.getItems()
        })
    },
    getItems() {
      this.$http.post('/carteJobs/repository/items', this.currentPath)
        .then((response) => {
          this.items = response.data
        })
    },
    open() {
      this.getDirTree()
      this.$refs.dialog.open()
    },
    close() {
      this.$refs.dialog.close()
    },
    next() {
      this.show = !this.show
    },
    save() {},
    back() {
      this.show = !this.show
    },
    handleNodeClick(data) {
      this.currentPath = data
      this.getItems()
    },
    handleCurrentChange(val) {
      this.currentRow = val
      if (this.currentRow && this.currentRow.type === 'job') {
        this.nextDisable = false
      } else {
        this.nextDisable = true
      }
    }
  },
  computed: {
    step: function() {
      if (this.show) {
        return '（选择作业文件）'
      } else {
        return '（作业执行明细）'
      }
    }
  }
}
</script>
<style scoped>
.el-textarea {
  width: 50%;
}
</style>
