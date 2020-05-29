<template>
    <div class="spin-wrapper">
        <p class='spin-icon-load'>
            <i class='circle red'></i>
            <i class='circle green'></i>
            <i class='circle blue'></i>
        </p>
        <p class='spin-icon-text' v-if="!$slots.default">Loading...</p>
        <slot></slot>
    </div>
</template>

<script>
export default {
  name:'spinLoading'
}
</script>

<style lang="less" scoped>
.spin-icon-load{
    width:40px;
    height:40px;
    margin:auto;
    animation: spin 1s linear infinite;
    position: relative;
    transform-origin: center center;
    /* border:1px solid red; */
}
.spin-icon-text{
    margin-top:15px;
}
.circle{
    position:absolute;
    top:0;left:14px;
    width:12px;
    height:12px;
    border-radius: 50%;
    transform-origin: 6px 22px;
    animation: larger 1.5s linear infinite;
}
.red{
  background:#D61518;
  transform:rotate(120deg);
  animation-delay:1s;
}
.green{
  background:#88B927;
  transform:rotate(-120deg);
  animation-delay: 2s;
}
.blue{
  background:#219BD6;
}
@keyframes spin{
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
@keyframes larger {
  from{
    width:10px;
    height:10px;
    opacity: .5;
  }
  50%{
    width:16px;
    height:16px;
    opacity: 1;
  }
  to{
    width:10px;
    height:10px;
    opacity: .5;
  }
}
</style>