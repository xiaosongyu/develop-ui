<template>
  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
      <div class="navbar-header">
        <img class="navbar-logo" src="../assets/images/logo.svg">
        <a class="navbar-brand" href="#">Cobra 数据采集管理平台</a>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <el-menu :default-active="activeIndex" class="nav navbar-nav navbar-right" mode="horizontal" @select="handleSelect">
          <el-menu-item index="3">帮助</el-menu-item>
          <el-menu-item index="3">退出</el-menu-item>
        </el-menu>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'wn-top-bar',
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style scoped>
.el-menu {
  background-color: inherit
}

.el-menu--horizontal .el-menu-item {
  height: 55px;
}
</style>
