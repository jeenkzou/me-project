<template>
  <!-- 加载层 -->
  <div class="loading-mask me-loading" v-show="isShow">
    <spin></spin>
  </div>
</template>

<script>
import spin from './components/spin'
export default {
  name:'pageLoading',
  components:{
    spin
  },
  props:{
    show:{
      type:Boolean,
      default:false
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

<style lang='less' scoped>
.loading-mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1111;
    height:100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    > i {
      font-size:40px;
      color:@color-primary;
    }
}
</style>