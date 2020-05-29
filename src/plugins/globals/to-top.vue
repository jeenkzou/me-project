<!-- 
@startTime:2019-
@author:zoujingqiang
@endTime:2019-
@description:返回顶部
-->
<template>
  <transition name='top2bottom'>
    <div class='to-top-box' title='返回顶部' v-show='show' @click='toTop'>
      <i class="meiconfont meicon-to-top"></i>
    </div>
  </transition>
</template>

<script>
export default {
  name:'toTop',
  data () {
    return {
      show:false,
      frameBox:null
    };
  },
  methods: {
    throttle(func,delay=50,type='timestamp'){
        var timer = null;
        var pretime = 0;
        return function(){
            var self = this;
            //时间戳的形式
            if(type==='timestamp'){
                var now = +new Date;//没触发一次就读取一次时间
                //直到读到的时间差达到规定时间，就触发一次函数
                if(now - pretime > delay){
                    func.call(self);
                    pretime = now;//重新赋值新的时间，重新计算时间差
                }
            }else if(type==='timeout'){
                //定时器的形式
                //只有当定时器伪null的时候，才设置定时器，当时定时器在规定时间执行完后，将timer=null重新设置一个新的定时器继续执行
                if(!timer){
                    timer = setTimeout(function(){
                        func.call(self)
                        timer=null
                    },delay)
                }
            }
        }
    },
    handleToTopShow(){
      this.show = this.frameBox.scrollTop>300?true:false
    },
    toTop(){
      this.$funs.scroll2Top(16,this.frameBox)
      this.show = false
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.frameBox = document.documentElement || document.body
      window.addEventListener('scroll',this.throttle(this.handleToTopShow))
    })
  },
  destroyed(){
    window.removeEventListener('scroll',this.throttle(this.handleToTopShow))
  }
}
</script>

<style lang='less' scoped>
  .to-top-box{
    position: fixed;
    z-index:666;
    // right:80px;
    right:calc(50% - 650px);
    bottom:180px;
    width:40px;
    height:40px;
    line-height: 40px;
    background: rgba(0,0,0,.1);
    // border:1px solid #ccc;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
    &:hover{
      background: rgba(0,0,0,.15);
    }
    .iconfont{
      color:#666;
      transform: rotate(-90deg) translate(1px,1px);
    }
  }
  .top2bottom-enter{
    transform: translateY(-50px);
    opacity: 0;
  }
  .top2bottom-leave-to{
    transform: translateY(-50px);
    opacity: 0;
  }
  .top2bottom-enter-active,
  .top2bottom-leave-active{
    transition:all .3s ease-in-out;
  }
@media screen and (max-width: 1300px) {
    .to-top-box{
      right:20px;
    }
}
</style>