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
      <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%; margin-top:10px" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
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
        checkPass: ''
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
      checked: true,
      engine: null
    }
  },
  mounted: function() {
    this.loadRain(this.engineCallback)
  },
  destroyed: function() {
    this.engine.stop = true
  },
  methods: {
    engineCallback() {
      this.engine = new RainyDay({
        image: document.getElementById('background'),
        parentElement: document.getElementById('canvas')
      })
      this.engine.rain(
        [
          [1, 0, 20],
          [3, 3, 1]
        ],
        200)
    },
    loadRain(callback) {
      var img = document.getElementById('background')
      img.onload = function() {
        img.onload = null
        callback()
      }
    },
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
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
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
  z-index: 99;
}

.login-container .title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

.login-container .remember {
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

.el-form-item__error {
  float: right;
}
</style>
