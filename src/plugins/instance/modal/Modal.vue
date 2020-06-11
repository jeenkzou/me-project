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
  <transition name="fade">
    <div class="modal-wrapper" v-show="show" id="my_modal_box">
      <transition name="scale">
        <div :class="[classDom]" v-show="show">
          <span class="mouse-move" @mousedown="handleMouseDown" :title="dragtitle"></span>
          <span class="modal-close" @click="choose(false,0)" v-show="close">
            <i class="meiconfont meicon-guanbi"></i>
          </span>
          <div class="modal-message">
            <p class="title">
              <span :class="[type=='delete'?'ptitle':'btitle']">{{title}}</span>
            </p>
            <p class="subtitle">
              <span>{{subtitle}}</span>
            </p>
          </div>
          <div class="operate">
            <me-button
              :inverse="true"
              class="margin-r-base"
              @click="choose(false,1)"
            >{{cancelButtonText}}</me-button>
            <me-button @click="choose(true,1)">{{confirmButtonText}}</me-button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
  
  <script>
import { handleDrag, recoverTransform } from "../../utils/fun-tools/drag";
import { isZh, isObject, isFunction } from "../../utils/fun-tools/boolean";
export default {
  data() {
    return {
      close: false, //是否显示关闭,默认是不显示
      show: false, //模态框是否显示
      title: "", //主标题
      subtitle: "", //副标题
      type: "", //消息类型
      cancelButtonText: "", //取消按钮名称
      confirmButtonText: "", //确定按钮名称
      callback: null, //按钮点击回调函数
      dragtitle: "",
      classDom: "modal-body"
    };
  },
  methods: {
    // 处理拖动事件
    handleMouseDown(e) {
      handleDrag(e, "." + this.classDom);
    },
    showModal(opts) {
      if (!opts) {
        throw new ReferenceError("params of modal component is required");
      }
      if (!isObject(opts)) {
        throw new TypeError("params of modal component must be Object");
      }
      let {
        type,
        title,
        subtitle,
        cancelButtonText,
        confirmButtonText,
        callback,
        close
      } = opts;
      if (!title) {
        throw new ReferenceError("title of modal component is required");
      }
      if (!isFunction(callback)) {
        throw new Error("callback must be required and accept a function");
      }
      this.title = title;
      this.subtitle = subtitle;
      this.cancelButtonText = cancelButtonText || (isZh() ? "取消" : "Cancel");
      this.confirmButtonText =
        confirmButtonText || (isZh() ? "确定" : "Confirm");
      this.dragtitle = isZh() ? "点击进行拖动" : "Drag and Move";
      this.show = true;
      this.type = type || "confirm";
      this.close = close || true;
      this.callback = callback;
    },
    // 选择确定还是取消还是关闭
    choose(bool, type) {
      this.closeModal();
      this.callback && this.callback({ bool, type });
    },
    // 仅关闭
    closeModal(bool) {
      recoverTransform("." + this.classDom);
      this.show = false;
      if (bool) {
        this.callback = null;
      }
    }
  }
};
</script>
  
  <style lang='less' scoped>
.modal-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11111;
  will-change: opacity;
  transition: opacity 0.3s linear;
}
.modal-wrapper > .modal-body {
  width: 400px;
  // height:227px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -95px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 4px 1px rgba(48, 76, 146, 0.2);
}
.modal-body > .mouse-move {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 11;
  width: 100%;
  height: 40px;
  cursor: move;
}
.modal-close {
  position: absolute;
  padding: 10px;
  top: 0;
  right: 0;
  z-index: 12;
  cursor: pointer;
  border-top-right-radius: 3px;
  color: #999;
}
.modal-close:hover {
  background: rgba(0, 0, 0, 0.05);
}
// .modal-close:hover>i{
//   color:#fff;
// }
.modal-wrapper > .modal-body > .modal-message {
  margin-top: 20px;
  margin-bottom: 40px;
  text-align: center;
  position: relative;
}
.modal-wrapper > .modal-body > .modal-message > p {
  display: block;
  text-align: center;
  margin-bottom: 20px;
}
.modal-wrapper .modal-message > p > span {
  display: inline-block;
}
.modal-body > .modal-message > .title > span {
  font-size: 2.4rem;
  font-weight: bold;
}
.modal-body > .modal-message > .title > .ptitle {
  color: @color-warning;
}
.modal-body > .modal-message > .title > .btitle {
  color: #000;
}
.modal-body > .modal-message > .subtitle > span {
  padding: 0 36px;
  text-align: justify;
  // line-height:6px;
  // white-space: wrap;
  word-break: break-all;
}
.modal-wrapper > .modal-body > .operate {
  text-align: center;
  margin-bottom: 20px;
}
.modal-wrapper > .modal-body > .operate > .ydy-btn {
  padding: 0;
  height: 34px;
  line-height: 34px;
  width: 80px;
  text-align: center;
}
</style>
  