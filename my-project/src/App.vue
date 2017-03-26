<template>
  <div id="app">
    <wn-top-bar class="container-fluid"></wn-top-bar>
    <div class="container-fluid">
      <div class="row">
        <wn-side-nav></wn-side-nav>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <h1 class="page-header">Dashboard</h1>
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
@import './css/framework.css'
</style>
