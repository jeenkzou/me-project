<!--
  @param {Object} opts = {
    show:Bool,//true or false,显示与否
    type:String,//'delete' or 'confirm',//颜色选择
    title:String,//'',标题
    subtitle:String,//'',副标题
  }
  @param:{String} scope,//'global'范围：全局还是局部
  @return @on-click='handleModalRes()'
-->
<template>
  <transition name='fade'>
      <div class="modal-box" v-show='show' id='my_modal_box'>
        <transition name='scale'>
          <div class='modal-body' v-show='show'>
            <span class='mouse-move' @mousedown="handleMouseDown" :title='dragtitle'></span>
            <span class='modal-close' @click='choose(false,0)' v-show='close'>
              <i class="meiconfont meicon-guanbi"></i>
            </span>
            <div class='modal-message'>
              <p class='title'>
                <span :class="[type=='delete'?'ptitle':'btitle']">{{title}}</span>
              </p>
              <p class='subtitle'>
                <span >{{subtitle}}</span>
              </p>
            </div>
            <div class='operate'>
                <me-button :inverse='true' class='margin-r-base' @click="choose(false,1)">{{cancelButtonText}}</me-button>
                <me-button @click="choose(true,1)">{{confirmButtonText}}</me-button>
            </div>        
          </div>
        </transition>
      </div>
  </transition>
</template>
  
  <script>
  export default{
    data(){
      return {
        close:false,//是否显示关闭,默认是不显示
        show:false,//模态框是否显示
        title:'',//主标题
        subtitle:'',//副标题
        type:'',//消息类型
        cancelButtonText:'',//取消按钮名称
        confirmButtonText:'',//确定按钮名称
        callback:null, //按钮点击回调函数
        dragtitle:''
      }
    },
    methods: {
      // 处理拖动事件
      handleMouseDown(e){
        let bodyDom = document.querySelector('.modal-body')
        let pageX = 0
        let pageY = 0
        let transformX = 0
        let transformY = 0
        let canMove = false
        let transform = /\(.*\)/.exec(bodyDom.style.transform)
        if (transform) {
          transform = transform[0].slice(1, transform[0].length - 1)
          let splitxy = transform.split('px, ')
          transformX = parseFloat(splitxy[0])
          transformY = parseFloat(splitxy[1].split('px')[0])
        }
        pageX = e.pageX
        pageY = e.pageY
        canMove = true
        const handleMousemove = e => {
          let xOffset = e.pageX - pageX + transformX
          let yOffset = e.pageY - pageY + transformY
          // if (canMove) bodyDom.style.transform = `translate(${xOffset}px, ${yOffset}px)`
          if(canMove){
            let ol = bodyDom.offsetLeft
            let ot = bodyDom.offsetTop
            let absx = Math.abs(xOffset)
            let absy = Math.abs(yOffset)
            if(ol>absx){
              if(ot>absy){
                bodyDom.style.transform = `translate(${xOffset}px, ${yOffset}px)`
              }else{
                ot = yOffset>0?ot:-ot
                bodyDom.style.transform = `translate(${xOffset}px, ${ot}px)`
              }
            }else{
              ol = xOffset>0?ol:-ol
              if(ot>absy){
                bodyDom.style.transform = `translate(${ol}px, ${yOffset}px)`
              }else{
                ot = yOffset>0?ot:-ot
                bodyDom.style.transform = `translate(${ol}px, ${ot}px)`
              }
            }
          }
        }
        const handleMouseup = e => {
          canMove = false
        }
        document.onmousemove = handleMousemove
        document.onmouseup = handleMouseup
      },
      recoverTransform(){
        setTimeout(() => {
          let bodyDom = document.querySelector('.modal-body')
          bodyDom.style.transform = ''
        }, 500);
      },
      // 判断中英文
      isZh(){
        return true
      },
      showModal(opts){
        if(!opts){
          throw new ReferenceError('params of modal component is required')
        }
        if(typeof opts !== 'object'){
          throw new TypeError('params of modal component must be Object')
        }
        let {type,title,subtitle,cancelButtonText,confirmButtonText,callback,close} = opts
        if(!title){
          throw new ReferenceError('title of modal component is required')
        }
        if(!callback && typeof callback !=='function'){
          throw new Error('callback must be required and accept a function')
        }
        this.title = title;
        this.subtitle = subtitle;
        this.cancelButtonText = cancelButtonText || (this.isZh()?'取消':'Cancel');
        this.confirmButtonText = confirmButtonText || (this.isZh()?'确定':'Confirm');
        this.dragtitle = this.isZh()?'点击进行拖动':'Drag and Move';
        this.show = true;
        this.type = type || 'confirm';
        this.close = close || true;
        this.callback = callback;
      },
      // 选择确定还是取消还是关闭
      choose (bool,type) {
        this.closeModal()
        this.callback && this.callback({bool,type});
      },
      // 仅关闭
      closeModal(bool){
        this.recoverTransform();
        this.show = false;
        if(bool){
          this.callback = null;
        }
      }
    }
  }
  </script>
  
  <style lang='less' scoped>
    .modal-box{
      width:100%;
      height:100%;
      overflow: hidden;
      background:rgba(0,0,0,.2);
      position: fixed;
      top:0;left:0;
      z-index: 11111;
      will-change: opacity;
      transition: opacity .3s linear;
    }
    .modal-box>.modal-body{
      width:400px;
      // height:227px;
      position: absolute;
      top:50%;left:50%;
      margin-left:-200px;
      margin-top:-95px;
      background:#fff;
      border-radius: 10px;
      box-shadow: 0 0 4px 1px rgba(48,76,146,.2);
    }
    .modal-body>.mouse-move{
      position: absolute;
      top:0;left:0;
      z-index: 11;
      width:100%;
      height:40px;
      cursor: move;
    }
    .modal-close{
      position: absolute;
      padding:10px;
      top:0;right:0;
      z-index: 12;
      cursor: pointer;
      border-top-right-radius: 3px;
      color:#999;
    }
    .modal-close:hover{
      background:rgba(0,0,0,.05);
    }
    // .modal-close:hover>i{
    //   color:#fff;
    // }
    .modal-box>.modal-body>.modal-message{
      margin-top:20px;
      margin-bottom: 40px;
      text-align: center;
      position: relative;
    }
    .modal-box>.modal-body>.modal-message>p{
      display: block;
      text-align: center;
      margin-bottom: 20px;
    }
    .modal-box .modal-message>p>span{
      display: inline-block;
    }
    .modal-body>.modal-message>.title>span{
      font-size:2.4rem;
      font-weight: bold;
    }
    .modal-body>.modal-message>.title>.ptitle{
      color:@color-warning;
    }
    .modal-body>.modal-message>.title>.btitle{
      color:#000;
    }
    .modal-body>.modal-message>.subtitle>span{
      padding:0 36px;
      text-align: justify;
      // line-height:6px;
      // white-space: wrap;
      word-break: break-all;
    }
    .modal-box>.modal-body>.operate{
      text-align:center;
      margin-bottom: 20px;
    }
    .modal-box>.modal-body>.operate>.ydy-btn{
      padding:0;
      height: 34px;
      line-height: 34px;
      width:80px;
      text-align: center;
    }
  </style>
  