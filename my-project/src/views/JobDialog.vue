<template>
  <el-dialog :title="'新增作业'+step" :visible.sync="visible" :close-on-click-modal="false" :before-close="handleClose">
    <el-popover ref="timeTip" placement="top-start" title="例子" width="200" trigger="hover" content="0 0 12 * * ? (每天中午12点触发)">
    </el-popover>
    <div v-show="step1">
      <el-row style="margin:5px">
        <el-col :span="7">
          <div id="panel" style="border:2px solid #d1dbe5">
            <el-tree :data="tree" :props="defaultProps" @node-click="handleNodeClick" style="height:250px" :render-content="treeRender"></el-tree>
          </div>
        </el-col>
        <el-col :span="17">
          <div id="panel" style="border:2px solid #d1dbe5;margin-left:5px">
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
    <div v-show="step2" style="margin:10px" label-position="right">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="作业路径" style="margin-left:28px" prop="path">
          <el-input v-model="form.path" size="small" readonly style="width:230px!important"></el-input>
        </el-form-item>
        <el-form-item label="作业名称" style="margin-left:28px" prop="jobName">
          <el-input v-model="form.jobName " size="small" style="width:230px!important"></el-input>
        </el-form-item>
        <el-form-item label="执行时间表达式">
          <el-input v-model="form.cronExp" size="small" style="width:230px!important"></el-input>
          <i class="el-icon-information" v-popover:timeTip></i>
        </el-form-item>
        <el-form-item label="描述" style="margin-left:75px">
          <el-input v-model="form.jobDesc" size="small" type="textarea" :rows="2"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="step3" style="margin:10px" label-position="right">
      <el-table :data="form.params" border>
        <el-table-column prop="parameter" label="参数名称" min-width="130">
        </el-table-column>
        <el-table-column prop="defaultValue" label="默认值" width="160">
        </el-table-column>
        <el-table-column prop="value" label="值" width="160" class-name="column-edit">
          <template scope="scope">
            <el-input v-model="form.params[scope.$index].value"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="描述" width="160">
        </el-table-column>
      </el-table>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="back" v-show="backShow">上一步</el-button>
      <el-button type="primary" @click="next" v-show="nextShow" :disabled="nextDisable">下一步</el-button>
      <el-button type="primary" @click="submitForm('form')" v-show="saveShow">保存</el-button>
      <el-button type="primary" @click="handleClose">退出</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'jobDialog',
  props: {
    serverId: Number
  },
  data() {
    return {
      nextDisable: true,
      step1: true,
      step2: false,
      step3: false,
      nextShow: true,
      backShow: false,
      saveShow: false,
      paramsInit: false,
      visible: false,
      currentPath: {
        path: '/'
      },
      tree: [{
        label: '/',
        children: []
      }],
      items: [],
      form: {
        serverId: '',
        path: '',
        jobName: '',
        cronExp: '',
        jobDesc: '',
        params: []
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      currentRow: null,
      rules: {
        path: {
          required: true,
          message: '作业路径不可为空'
        },
        jobName: {
          required: true,
          message: '请输入作业名称'
        }
      }
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
      this.visible = true
    },
    handleClose(done) {
      this.nextDisable = true
      this.step1 = true
      this.step2 = false
      this.step3 = false
      this.nextShow = true
      this.backShow = false
      this.saveShow = false
      this.currentPath.path = '/'
      this.form.path = ''
      this.form.jobName = ''
      this.form.cronExp = ''
      this.form.jobDesc = ''
      this.form.params = []
      this.paramsInit = false
      this.visible = false
    },
    next() {
      if (this.step1) {
        this.form.path = this.currentRow.objectId
        this.form.jobName = this.currentRow.name
        this.form.jobDesc = this.currentRow.desc
        if (!this.paramsInit) {
          this.$http.post('/carteJobs/kettle/params', this.form)
            .then((response) => {
              this.form.params = response.data
              if (this.form.params && this.form.params.length > 0) {
                this.nextShow = true
                this.saveShow = false
              } else {
                this.nextShow = false
                this.saveShow = true
              }
              this.paramsInit = true
            })
        }
        this.step1 = false
        this.step2 = true
        this.backShow = true
      } else if (this.step2) {
        this.step2 = false
        this.step3 = true
        this.nextShow = false
        this.saveShow = true
        this.backShow = true
      }
    },
    back() {
      if (this.step2) {
        this.step1 = true
        this.step2 = false
        this.backShow = false
      } else if (this.step3) {
        this.step2 = true
        this.step3 = false
      }
      this.nextShow = true
      this.saveShow = false
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.serverId = this.serverId
          this.$http.post('/carteJobs/add', this.form)
            .then((response) => {
              this.$emit('save')
              this.close()
            })
        }
      })
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
    },
    treeRender(h, vm) {
      return h(
        'div', {
          'class': {
            'glyphicon': true,
            'glyphicon-folder-open': true
          },
          domProps: {
            innerHTML: '<span style="margin-left:10px">' + vm.node.label + '</span>'
          }
        }
      )
    }
  },
  computed: {
    step: function() {
      if (this.step1) {
        return '（选择作业文件）'
      } else if (this.step2) {
        return '（作业执行明细）'
      } else if (this.step3) {
        return '（作业执行参数）'
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
