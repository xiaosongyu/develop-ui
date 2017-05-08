<template>
  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="navbar-header">
      <img class="navbar-logo" src="../assets/images/logo.svg">
      <a class="navbar-brand" href="#">Cobra 数据采集管理平台</a>
    </div>
    <el-col :span="4" class="userinfo">
      <el-dropdown>
        <span class="el-dropdown-link userinfo-inner"><img src="../assets/images/empty.jpg" />{{userName}}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>我的消息</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </nav>
</template>
<script>
export default {
  name: 'wn-top-bar',
  data() {
    return {
      activeIndex: '1',
      userName: ''
    }
  },
  mounted() {
    var user = sessionStorage.getItem('user')
    if (user) {
      user = JSON.parse(user)
      this.userName = user.username || ''
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    logout: function() {
      this.$http.post('/logout')
        .then((response) => {
          sessionStorage.removeItem('user')
          this.$router.push('/login')
        })
    }
  }
}
</script>
<style>
.el-menu {
  background-color: inherit
}

.el-menu--horizontal .el-menu-item {
  height: 55px;
}

.userinfo {
  text-align: right;
  padding-right: 35px;
  float: right;
}

.userinfo .userinfo-inner {
  cursor: pointer;
  color: #fff;
  height: 60px;
  line-height: 60px;
}

.userinfo .userinfo-inner img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 10px 0px 10px 10px;
  float: right;
}
</style>
