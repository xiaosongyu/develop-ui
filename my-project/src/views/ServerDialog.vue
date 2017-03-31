<template>
  <el-dialog title="新增采集节点" ref="dialog" :rules="rules">
    <el-form :model="form" ref="form" :rules="rules">
      <el-tabs type="border-card">
        <el-tab-pane label="节点信息">
          <el-col :span="14">
            <el-form-item label="节点名称" label-width="90px" prop="name">
              <el-input v-model="form.name" size="small" style="width:210px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="IP地址" label-width="90px" prop="ipAddress">
              <el-input v-model="form.ipAddress" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="端口" label-width="70px" prop="port">
              <el-input v-model.number="form.port" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名" label-width="90px">
              <el-input v-model="form.userName" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" label-width="70px">
              <el-input v-model="form.password" type="password" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="代理服务器">
          <el-col :span="16">
            <el-form-item label="代理服务器地址" label-width="110px">
              <el-input v-model="form.proxy.proxyHost" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="代理服务器端口" label-width="110px">
              <el-input v-model.number="form.proxy.proxyPort" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('form')">保存</el-button>
      <el-button type="primary" @click="close">退出</el-button>
    </div>
  </el-dialog>
</template>
<script type="text/javascript">
export default {
  name: 'serverDialog',
  data() {
    return {
      form: {
        name: '',
        ipAddress: '',
        port: '',
        userName: '',
        password: '',
        proxy: {
          proxyHost: '',
          proxyPort: ''
        }
      },
      rules: {
        name: {
          required: true,
          message: '请输入节点名称'
        },
        ipAddress: {
          required: true,
          message: '请输入主机名称或IP地址'
        },
        port: [{
          required: true,
          message: '请输入端口号'
        }, {
          type: 'number',
          message: '端口必须为数字值'
        }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/carteServers/add', this.form)
            .then((response) => {
              this.$emit('save')
              this.close()
            })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    open() {
      this.$refs.dialog.open()
    },
    close() {
      this.$refs.dialog.close()
    }
  }
}
</script>
<style scope>
.el-dialog__header {
  background-color: #0079f4;
  padding: 10px 10px 8px;
}

.el-dialog__title {
  line-height: 1;
  font-size: 14px;
  color: #fffefe;
}

.el-dialog__body {
  padding: 0px 0px 0px;
  background-color: #f3f4f8;
  font-size: 14px;
}

.el-row:last-child .el-form-item {
  margin-bottom: 0px;
}

.el-button--info {
  background-color: #bdd8f5;
  color: #000000;
}

.el-form-item {
  margin-bottom: 10px;
}

.el-form-item__error {
  padding-top: 0px;
}

.el-form-item__label {
  line-height: 1;
}
</style>
