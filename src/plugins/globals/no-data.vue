<template>
  <div :class="['nodata-wrapper',size]" v-show='isShow'>
      <img src="@/assets/nodata.svg" alt="暂无数据" v-if="showImg">
      <span class='msg' v-html="msg"></span>
      <slot></slot>
  </div>
</template>

<script>
export default {
  name:'noData',
  props:{
    show:Boolean,
    msg:{
      type:String,
      default:'木有数据呀～'
    },
    size:{
      type:String,
      default:'small'
    },
    showImg:{
      type:Boolean,
      default:true
    }
  },
  watch:{
    show:{
      handler:function(bool){
        if(bool){
          this.timer = setTimeout(() => {
            this.isShow = true
          }, 500);
        }else{
          clearTimeout(this.timer)
          this.isShow = false
        }
      },
      immediate:true
    }
  },
  data(){
    return {
      isShow:false,
      timer:null
    }
  }
}
</script>
<style lang="less" scoped>
.nodata-wrapper{
  position:absolute;
  top:50%;left:50%;
  transform: translate(-50%,-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color:#9aaecb;
  font-size:18px;
  width: 100%;
  text-align:center;
  img{
    display: block;
    width:225px;
    margin-bottom:20px;
  }
  &.small{
    .msg{
      font-size:16px;
    }
    img{
      width:140px;
    }
  }
}
</style>
