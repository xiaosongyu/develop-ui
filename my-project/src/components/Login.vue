<template>
  <div id="canvas">
    <img id="background" alt="background" src="../assets/images/login.jpg" />
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">Cobra 数据采集管理平台</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  RainyDay
} from '../assets/js/rainday.js'
export default {
  name: 'login',
  data() {
    return {
      logining: false,
      ruleForm2: {
        account: 'admin',
        checkPass: '123456'
      },
      rules2: {
        account: [{
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        }],
        checkPass: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      },
      checked: true
    }
  },
  mounted: function() {
    var image = document.getElementById('background')
    image.onload = function() {
      var engine = new RainyDay({
        image: this,
        parentElement: document.getElementById('canvas')
      })
      engine.rain([
        [3, 2, 2]
      ], 100)
    }
    image.crossOrigin = 'anonymous'
  },
  destoyed: function() {

  },
  methods: {
    handleReset() {
      this.$refs.ruleForm2.resetFields()
    },
    handleSubmit(ev) {
      var request = {
        loading: false
      }
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          this.logining = true
          var loginParams = {
            username: this.ruleForm2.account,
            password: this.ruleForm2.checkPass
          }
          this.$http.post('/login', loginParams, request)
            .then((response) => {
              if (response.data.success) {
                sessionStorage.setItem('user', JSON.stringify(response.data.target))
                this.$router.push({
                  path: '/'
                })
              } else {
                this.$message({
                  message: this.$t('error.' + response.data.resCode),
                  type: 'warning'
                })
              }

              this.logining = false
            }).catch(function(response) {
              this.logining = false
            })
        }
      })
    }
  }
}
</script>
<style scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  margin: auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  position: absolute;
  left: 35%;
  top: 30%;
  text-align: center;
  overflow: hidden;
  z-index: 99999;
}

.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

.remember {
  margin: 0px 0px 35px 0px;
}

body {
  overflow: hidden;
  height: 100%;
  margin: 0;
  padding: 0;
}

img {
  width: 100%;
  height: 100%;
}
</style>
