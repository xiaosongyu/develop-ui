<template>
  <div class="one-block">
    <div class="bg-block">
      <img :src="img" class="img-responsive" />
    </div>
    <div class="detail-block active">
      <span class="span-number" :style="'color:'+fontColor">{{value}}</span>
      <span><slot></slot></span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'state-block-chart',
  props: {
    img: {
      type: String,
      default: ''
    },
    value: Number,
    fontColor: {
      type: String,
      default: ''
    }

  }
}
</script>
<style scoped>
.first-block {
  background-color: #21b7c6;
  overflow: auto;
  padding-right: 0px;
}

.title-block,
.detail-block {
  padding: 10px 0;
  text-align: center;
  color: #FFFFFF;
}

.bg-block {
  text-align: center;
  color: #FFFFFF;
  padding: 0px;
  width: 30%;
  float: left
}

.detail-block {
  background: #f5f5f5;
  margin: 0px 0px;
  padding: 9px 0;
  color: #898989;
  cursor: pointer;
  width: 70%;
  float: right;
}

.span-number {
  font-size: 36px;
  color: #898989;
}
</style>
