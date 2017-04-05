<template>
  <nav class="col-sm-3 col-md-2 sidebar">
    <el-menu default-active="1" @open="handleOpen" @close="handleClose" :default-openeds="defaultOpens" router>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu"></i>采集节点管理</template>
        <el-menu-item index="/home"><i class="el-icon-view"></i>采集监控</el-menu-item>
        <el-menu-item index="/repository"><i class="el-icon-picture"></i>配置仓库</el-menu-item>
      </el-submenu>
      <el-menu-item index="/hello"><i class="el-icon-menu"></i>帮助</el-menu-item>
      <el-menu-item index="3"><i class="el-icon-setting"></i>设置</el-menu-item>
    </el-menu>
  </nav>
</template>
<script>
export default {
  name: 'wn-side-nav',
  data() {
    return {
      defaultOpens: ['1']
    }
  },
  created() {

  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style scoped>
.el-menu {
  background-color: inherit
}

.el-menu-item,
.el-submenu__title {
  line-height: 30px;
  height: 30px
}

.sidebar {
  padding: 20px 0 0 0;
}

.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active,
.el-menu-item.is-active {
  font-weight: bold;
}
</style>
