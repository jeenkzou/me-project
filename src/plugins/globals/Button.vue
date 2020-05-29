<template>
  <button
    class='me-button'
     :class="[
       (gradient&&!disabled)?'linear-g-'+color:(inverse?'bgcolor-inverse':'bgcolor-'+color),
       (inverse&&!disabled)?('color-'+color+' border-'+color):'',
       disabled?'bg-c-dis':(loadingShow?'me-loading':'highlight'),
       size
     ]" @click='buttonClick'>
     <i v-show='loadingShow' class="meiconfont meicon-loading margin-r-xs"></i>
     <span>
       <span v-if='!$slots.default'>buttonName</span>
       <slot></slot>
     </span>
  </button>
</template>

<script>
export default {
  name:'meButton',
  props:{
    //是否加载
    'loading':{
      type:Boolean,
      default:false
    },
    //延迟时间
    'duration':{
      type:Number,
      default:2
    },
    //是否渐变
    'gradient':{
      type:Boolean,
      default:false
    },
    //颜色主题
    'color':{
      default:'primary'
    },
    //是否镂空
    inverse:{
      type:Boolean,
      default:false
    },
    //大小尺寸
    'size':{
      type:String,
      default:''
    },
    //是否禁用
    'disabled':{
      type:Boolean,
      default:false
    },
    //是否延迟
    'timeout':{
      type:Boolean,
      default:true
    }
  },
  watch:{
    loading:{
      handler:function(n,o){
        if(!n){
          clearTimeout(this.clickTimer)
          this.clicked = false
          clearTimeout(this.loadingTimer)
          this.loadingShow = false
        }else{
          this.loadingTimer =setTimeout(() => {
            this.loadingShow = true
          }, 1000);
        }
      }
    }
  },
  data () {
    return {
      clicked:false,
      clickTimer:null,
      loadingShow:false,
      loadingTimer:null
    };
  },
  methods: {
     buttonClick(e){
      if(this.clicked || this.disabled) return
      this.$emit('click',e)
      if(this.isTimeout){
        this.clicked = true
        this.clickTimer = setTimeout(()=>{
          this.clicked = false
        },this.duration*1000)
      }
     }
  }
}
</script>