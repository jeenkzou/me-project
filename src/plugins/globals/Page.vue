<!-- 
@startTime:2019-10-31
@author:zoujingqiang
@endTime:2019-10-31
@description:分页
-->
<template>
  <div class='page-wrapper' v-show='pages>1'>
    <ul class='jq-page'>
      <li
        :class="{'page-item':true,'page-item-prev':true,'page-item-disabled':current==1}"
        title='上一页'
        @click="handleItemClick('on-prev',-1)"
      >
        <span>&lt;</span>
      </li>
      <li class='page-number'>
        <ul>
          <!-- <li
            v-for='(page,i) in pages'
            :key='i'
            :title='page'
            :class="{'page-item':true,'page-item-active':current==page}"
            @click="handleItemClick('on-num',page)"
          >
            <span>{{page}}</span>
          </li> -->
          <li class="page-item" v-if='current>3' @click="handleItemClick('on-num',1)">
            <span>1</span>
          </li>
          <li class="page-item" v-if='current>4' @click="handleItemClick('on-num',current-3)">
            <span>···</span>
          </li>
          <li class="page-item" v-if='current>2' @click="handleItemClick('on-num',current-2)">
            <span>{{current-2}}</span>
          </li>
          <li class="page-item" v-if='current>1' @click="handleItemClick('on-num',current-1)">
            <span>{{current-1}}</span>
          </li>
          <li class="page-item page-item-active">
            <span>{{current}}</span>
          </li>
          <li class="page-item" v-if='current+1<pages' @click="handleItemClick('on-num',current+1)">
            <span>{{current+1}}</span>
          </li>
          <li class="page-item" v-if='current+2<pages' @click="handleItemClick('on-num',current+2)">
            <span>{{current+2}}</span>
          </li>
          <li class="page-item" v-if='current+3<pages' @click="handleItemClick('on-num',current+3)">
            <span>···</span>
          </li>
          <li class="page-item" v-if='current!=pages' @click="handleItemClick('on-num',pages)">
            <span>{{pages}}</span>
          </li>
        </ul>
      </li>
      <li
        :class="{'page-item':true,'page-item-next':true,'page-item-disabled':current==pages}"
        title='下一页'
        @click="handleItemClick('on-next',1)"
      >
        <span>&gt;</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'mePage',
  props:{
    // pageMap = {current:'',size:'',total:''}
    'page-map':{
      type:Object,
      required:true
    },
    'is-to-top':{
      type:Boolean,
      default:true
    },
  },
  watch:{
    pageMap:{
      handler:function(nv){
        this.current = nv.current
        this.total = nv.total
        this.size = nv.size
      },
      immediate:true,
      deep:true
    }
  },
  data () {
    return {
      current:1,
      total:1,
      size:12
    };
  },
  computed:{
    pages(){
      return Math.ceil(this.total/this.size)
    }
  },
  methods: {
    handleItemClick(type,num){
      switch(type){
        case 'on-prev':{
          if(this.current==1) return
          this.current--;
          break;
        }
        case 'on-num':{
          this.current = num
          break;
        }
        case 'on-next':{
          if(this.current==this.pages) return
          this.current++;
          break;
        }
      }
      if(this.isToTop){
        this.$funs.scroll2Top(10,document.documentElement || document.body,0)
      }
      this.$emit('on-page',this.current)
    }
  }
}
</script>

<style lang='less' scoped>
  .page-wrapper{
    padding: 10px 0;
    max-width: 1280px;
    text-align: right;
    ul,li{
      display: inline-block;
    }
    .page-item{
      margin-right:10px;
      cursor: pointer;
      padding:12px 15.2px;
      border-radius: 3px;
      background: #f0f2f5;
      &:hover{
        color:@color-primary;
      }
      &-active{
        background:@color-primary;
        color:#fff !important;
        border-color:@color-primary;
      }
      &-next{
        margin-right:0;
      }
      &-disabled{
        color:#ccc !important;
        border-color: #ccc !important;
        cursor: not-allowed;
      }
    }
  }
</style>