// Modal.js
import Vue from 'vue';

// 具体的组件
import Modal from './Modal.vue';
Modal.newInstance = properties => {
    const props = properties || {};
	// 实例化一个组件，然后挂载到body上
    const Instance = new Vue({
        data: props,
        render:function(h){
            return h(Modal, {
                props: props
            });
        }
    });
    const component = Instance.$mount();
    document.body.appendChild(component.$el);
	// 通过闭包维护alert组件的引用
    const modal = Instance.$children[0];
    return {
        // Alert组件对外暴露的两个方法
        show :function() {
          modal.showModal(...arguments);
        },
        handler :function() {
          modal.choose(...arguments);
        },
        close :function(){
          modal.closeModal(...arguments)
        }
    }
};

// 提示单例
let modalInstance;
function getModalInstance () {
    modalInstance = modalInstance || Modal.newInstance();
    return modalInstance;
}
function show() {
    // 等待接口调用的时候再实例化组件，避免进入页面就直接挂载到body上
    let instance = getModalInstance();
    instance.show(...arguments);
}
function handler(){
  // 等待接口调用的时候再实例化组件，避免进入页面就直接挂载到body上
  let instance = getModalInstance();
  instance.handler(...arguments);
}
function close(){
    let instance = getModalInstance();
    instance.close(...arguments);
}
Vue.prototype.$modal = {
  show,
  close,
  handler
}
export default {
  show,
  close,
  handler
}