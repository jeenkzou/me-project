<template>
  <div class="me-card-wrapper">
    <div class="head">{{titleName}}</div>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:'meCard',
  props:{
    titleName:{
      type:String,
      default:'标题'
    }
  }
}
</script>

<style lang='less' scoped>
  .me-card-wrapper {
    border       : 1px solid @border-color;
    border-radius: @border-radius-base;
    overflow     : hidden;

    &:hover {
      box-shadow: 0 1px 5px 0 rgba(99, 99, 99, 0.2);
    }

    .head {
        background   : linear-gradient(0deg, darken(@bg-color-primary, 15%) 0%, lighten(@bg-color-primary, 5%) 100%);
        padding      : 10px 15px;
        border-bottom: 1px solid @border-color;
    }

    .body {
      background:#fff;
      padding: 15px;
    }
}
</style>