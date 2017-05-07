<template>
  <div id="app">
    <wn-top-bar></wn-top-bar>
    <div class="container-fluid">
      <div class="row">
        <wn-side-nav></wn-side-nav>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2" style="margin-top:10px">
          <transition name="zoom" mode="out-in" enter-active-class="animated zoomIn" leave-active-class="animated bounceOutRight">
            <div style="margin-top:50px">
              <router-view></router-view>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TopBar from './TopBar'
import SideNav from './SideNav'

export default {
  name: 'frame',
  components: {
    'wn-top-bar': TopBar,
    'wn-side-nav': SideNav
  }
}
</script>
<style scoped>
</style>
