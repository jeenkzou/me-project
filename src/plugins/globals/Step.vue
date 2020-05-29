<template>
  <div class="step-wrapper">
    <div class='step-item' :class='{active:current>=index}' v-for='(step,index) in data' :key='step.name'>
      <span class='step-tail' v-if='index>0' :style="{width:index===3?'130px':'120px'}"></span><div class='step-title'>
        <p class='step-icon' style="position:relative;z-index:1;">
          <img :src="step.src" alt="" v-if='step.src'>
          <span v-else>图标</span>
        </p>
        <p class='name'>{{index+1}}.{{step.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'meSteps',
  props:{
    data:{
      type:Array,
      required:true
    },
    current:{
      default:0
    }
  },
  
}
</script>

<style lang='less' scoped>
.step-wrapper{
  display:flex;
  // border-bottom: 1px solid @border-color;
}
.step-item{
  margin-right:100px;
  position: relative;
}
.step-item.active{
  .step-icon{
    background:@color-primary;
  }
  .name{
    color:@color-primary;
  }
  .step-tail{
    background:@color-primary;
  }
}
.step-title{
  text-align: center;
  display:inline-block;
  color:#000;
  font-size: 16px;
  .name{
    transition: color .3s linear;
    font-family:Source Han Sans CN;
    font-weight:lighter;
    color:rgba(196,193,193,1);
  }
}
.step-icon{
  transition: background .3s linear;
  color:#fff;
  display: inline-block;
  width:57px;
  height:57px;
  line-height: 57px;
  text-align: center;
  margin-bottom:20px;
  background:rgba(178,176,176,1);;
  border-radius: 50%;
}
.step-tail{
  transition: background .3s ease-out;
  position: absolute;
  left:-110px;
  top:30px;
  width:120px;
  height:3px;
  background:rgba(178,176,176,1);
}
</style>