<template>
  <div class="step-wrapper">
    <div class='step-item' :class='{active:current>=index}' v-for='(step,index) in data' :key='step.name'>
      <span class='step-tail' v-if='index>0'></span><div class='step-title'>
        <p class='step-icon'>
          <!-- <img :src="step.src" alt="" v-if='step.src'> -->
          <!-- <span v-else>图标</span> -->
          <i class="meiconfont" :class="['meicon-'+(current_>=index?'chenggong':'shibai')]"></i>
        </p>
        <p class='name single-ellipsis'>{{index+1}}.{{step.name}}</p>
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
  watch:{
    current(val){
      //300s动画结束后再切换图标
      setTimeout(() => {
        this.current_ = val;
      }, 300);
    }
  },
  data(){
    return {
      current_:this.current
    }
  }
}
</script>

<style lang='less' scoped>
@gap:100px;
.step-wrapper{
  display:flex;
  margin-bottom:40px;
  // border-bottom: 1px solid @border-color;
}
.step-item{
  margin-right:@gap;
  position: relative;
}
.step-item.active{
  .step-icon{
    // background:@color-success;
    i{
      color:@color-success;
    }
  }
  .name{
    color:@color-success;
  }
  .step-tail{
    // background:@color-success;
    &::before{
      width:100%;
    }
  }
}
.step-title{
  text-align: center;
  display:inline-block;
  color:#000;
  font-size: 16px;
  .name{
    max-width:@gap;
    transition: color .3s linear .3s;
    font-family:Source Han Sans CN;
    font-weight:lighter;
    color:rgba(196,193,193,1);
    position: absolute;
    bottom:-30px;
  }
}
.step-icon{
  transition: background .3s linear .3s;
  color:#fff;
  display: inline-block;
  // width:57px;
  // height:50px;
  // line-height: 57px;
  // text-align: center;
  // margin-bottom:20px;
  // background:rgba(178,176,176,1);
  i{
    transition: color .3s linear;
    font-size:32px;
    color:rgba(178,176,176,1);
  }
  // border-radius: 50%;
}
.step-tail{
  // transition: background .3s ease-out;
  position: absolute;
  left:-@gap;
  top:18px;
  width:@gap;
  height:3px;
  background:rgba(178,176,176,1);
  &::before{
    transition: width .3s ease-out;
    content:'';
    position: absolute;
    top:0;left:0;
    width:0;height:100%;
    background:@color-success;
  }
}
</style>