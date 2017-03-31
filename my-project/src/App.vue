<template>
  <div id="app">
    <wn-top-bar></wn-top-bar>
    <div class="container-fluid">
      <div class="row">
        <wn-side-nav></wn-side-nav>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2" style="margin-top:10px">
          <transition name="slide-fade">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TopBar from './components/TopBar'
import SideNav from './components/SideNav'

export default {
  name: 'app',
  components: {
    'wn-top-bar': TopBar,
    'wn-side-nav': SideNav
  }
}
</script>
<style>
@import './assets/css/framework.css'
</style>
<style scoped>
.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */

{
  transform: translateX(10px);
  opacity: 0;
}
</style>
