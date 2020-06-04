<!--
  @param {Object} opts = {
    show:Bool,//true or false,
    msg:Array,//[]
    type:String,//'success' or 'error'
  }
  @param:{String} scope,//'global'范围：全局还是局部
  @return @on-click='handleMessageRes()'
-->
<template>
  <transition name='fade'>
    <div class="msg-wrapper" v-show='show'>
      <transition name='scale'>
        <div :class='[classDom]' v-show='show'>
          <p class='msg-head' @mousedown="handleMouseDown">
            <b class='msg-head-name'>{{title}}</b>
            <span class='msg-head-close' @click="clickComfirm(false)" :title='dragtitle'>
              <i class='meiconfont meicon-guanbi'></i>
            </span>
          </p>
          <p class="msg-body">
            <span class='msg-content'>
              <span class='spanItem'  v-for='(item,index) in messages' :key='index'>{{item}}</span>
            </span>
          </p>
          <div class="msg-btn">
            <me-button class='margin-r-base' :inverse='true' @click="clickComfirm(false)" v-if='cancelBtnShow'>{{cancelBtnName}}</me-button>
            <me-button @click="clickComfirm(true)" class='margin-r-base'>{{confirmBtnName}}</me-button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import {handleDrag,recoverTransform,isZh,isObject,getType} from '../../utils/functions';
export default {
  data(){
    return {
      middle:false,//是否居中
      show:false,//是否显示
      title:'提示',//提示头
      messages:[],//消息主体
      type:'error',//消息类型
      confirmBtnName:'确定',//按钮名称
      callback:null, //按钮点击回调函数
      dragtitle:'点击进行拖动',
      cancelBtnShow:false,
      cancelBtnName:'取消',
      classDom:'msg-container'
    }
  },
  methods:{
    // 处理拖动事件
    handleMouseDown(e){
      handleDrag(e,'.'+this.classDom)
    },
    // 点击关闭或者取消触发事件
    clickComfirm(bool){
      recoverTransform('.'+this.classDom);
      this.show = false
      this.callback && this.callback(bool)
    },
    // 显示消息提示框
    showMessage(opts){
      if(!opts){
          throw new ReferenceError('params of message component is required')
      }
      if(!isObject(opts)){
        throw new TypeError('params of message component must be Object')
      }
      let {messages,type,confirmBtnName,callback,title,cancelBtnShow,cancelBtnName} = opts
      if(!messages){
        throw new ReferenceError('messages of message component is required')
      }
      this.title = title || (isZh()?'提示':'Tip');
      this.confirmBtnName = confirmBtnName || (isZh()?'确定':'Confirm');
      this.cancelBtnShow = cancelBtnShow===true?true:false;
      this.cancelBtnName = cancelBtnName || '取消';
      this.dragtitle = isZh()?'点击进行拖动':'Drag and Move';
      this.show = true;
      if(getType(messages)==='string'){
        this.messages = [messages]
      }else if(getType(messages)==='array'){
        this.messages = messages
      }
      this.middle = this.messages.length<=1
      this.type = type
      if(getType(callback)==='function'){
        this.callback = callback
      }else{
        this.callback = null
      }
    }
  }
}
</script>

<style lang='less' scoped>
.center{
  display: flex;
  justify-content: center;
  align-items: center;
}
.msg-wrapper {
    background: rgba(29,32,40,.4);
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
    top: 0;
    left: 0;
    z-index: 10001;
    .center;
}
.msg-wrapper > .msg-container {
    border-radius: 3px;
    background: #fff;
    overflow: hidden;
    box-shadow: 0 2px 16px 2px rgba(0, 34, 111, 0.15);
}
.msg-wrapper .msg-head{
  position: relative;
  padding:7px 20px;
  background:#fff;
  cursor: move;
}
 .msg-head .msg-head-name{
   font-size: 1.6rem;
 }
.msg-wrapper .msg-head span.msg-head-close {
    text-align: center;
    position: absolute;
    top:0;right:0;
    z-index:12;
    cursor: pointer;
}
.msg-wrapper .msg-head span.msg-head-close>i{
  display: inline-block;
  color:#666;
  width:30px;
  height:30px;
  line-height: 30px;
  font-style: normal;
  text-align: center;
}
.msg-wrapper span.msg-head-close>i:hover{
  background:rgba(0, 0, 0, .1);
}
.msg-wrapper .msg-body {
    border-top:1px solid #ddd;
    overflow: auto;
    width: 360px;
    padding: 16px 20px;
    line-height: 24px;
    min-height: 100px;
    max-height: 200px;
    // color: #333;
}
.msg-wrapper .msg-body.mid{
  text-align: center;
}
.msg-wrapper .msg-body .msg-content{
  width:100%;
}
.msg-wrapper .msg-body span.spanItem{
  display: block;
  margin-bottom: 8px;
  word-break: break-all;
}
.msg-wrapper .msg-body span.spanItem>i{
  transform: translateY(-1px);
  display: inline-block;
  font-style: normal;
  width:20px;height:20px;
  line-height: 20px;
  text-align: center;
  border-radius: 50%;
  color:#fff;
  margin-right:5px;
  font-size:1rem;
}
.msg-wrapper .msg-btn{
  text-align: right;
  margin: 8px 0;
}
.msg-wrapper .msg-btn .ydy-btn{
    padding:4px 16px;
}

</style>