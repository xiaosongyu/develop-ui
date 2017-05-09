<template>
  <el-dialog title="新增采集节点" :visible.sync="visible" :close-on-click-modal="false" :before-close="handleClose">
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
      <el-button type="primary" @click="handleClose">退出</el-button>
    </div>
  </el-dialog>
</template>
<script type="text/javascript">
export default {
  name: 'serverDialog',
  data() {
    return {
      visible: false,
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
    open() {
      this.visible = true
    },
    handleClose(done) {
      this.$refs['form'].resetFields()
      this.visible = false
    }
  }
}
</script>
<style scope>
</style>
