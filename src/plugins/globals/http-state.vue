<!-- 
 请求响应的公用处理方式
-->
<template>
  <div :class="['me-http-wrapper',size]" v-show='showState<3'>
    <!-- 加载 -->
    <div v-show='showState===1'>
        <div class='content'>
            <spin></spin>
            <slot></slot>
        </div>
      </div>
      <!-- 没有数据 -->
      <div v-show='showState===2'>
        <img src="@/assets/nodata.svg" alt="" v-if="showImg">
        <span class='msg'>{{msg}}</span>
        <slot></slot>
      </div>
      
  </div>
</template>

<script>
import spin from './components/spin'
export default {
  name:'httpState',
  components:{
    spin
  },
  props:{
    state:{
      default:1
    },
    msg:{
      type:String,
      default:'木有数据呀～'
    },
    size:{
      type:String,
      default:''
    },
    showImg:{
      type:Boolean,
      default:true
    }
  },
  watch:{
    state:{
      handler:function(state){
        if(state<3){
          this.timer = setTimeout(() => {
            this.showState = state
          }, 500);
        }else{
          clearTimeout(this.timer)
          this.showState = state
        }
      },
      immediate:true
    }
  },
  data(){
    return {
      showState:false,
      timer:null
    }
  }
}
</script>
<style lang="less" scoped>
// **********数据为空时的图片展示
.me-http-wrapper{
  position:absolute;
  top:10%;left:50%;
  transform: translatex(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color:@text-color-primary;
  font-size:16px;
  text-align:center;
  img{
    display: block;
    margin-bottom:20px;
  }
  &.small{
    font-size:14px;
    img{
      transform: scale(.8);
    }
  }
}
.msg{
  color:#9aaecb;
  margin-top:6px;
}
.content{
  background:#fff;
  padding:30px 40px;
  border-radius: 5px;
}
</style>
