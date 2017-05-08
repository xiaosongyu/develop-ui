<template>
  <nav class="col-sm-3 col-md-2 sidebar">
    <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
      <!--导航菜单-->
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" unique-opened router v-show="!collapsed">
        <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
          <el-submenu :index="index+''" v-if="!item.leaf">
            <template slot="title"><i :class="item.icon"></i>{{item.name}}
            </template>
            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden"><i :class="child.icon"></i>{{child.name}}</el-menu-item>
          </el-submenu>
          <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.icon"></i>{{item.children[0].name}}</el-menu-item>
        </template>
      </el-menu>
    </aside>
  </nav>
</template>
<script>
export default {
  name: 'wn-side-nav',
  data() {
    return {
      defaultOpens: ['1'],
      collapsed: false
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
