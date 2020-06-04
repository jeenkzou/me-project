// Message.js
import Vue from 'vue';

// 具体的组件
import Message from './Message.vue';
Message.newInstance = properties => {
    const props = properties || {};
	// 实例化一个组件，然后挂载到body上
    const Instance = new Vue({
        data: props,
        render:function(h){
            return h(Message, {
                props: props
            });
        }
    });
    const component = Instance.$mount();
    document.body.appendChild(component.$el);
	// 通过闭包维护alert组件的引用
    const message = Instance.$children[0];
    return {
        // Alert组件对外暴露的两个方法
        show:function(noticeProps) {
          message.showMessage(noticeProps);
        },
        close:function(name) {
          message.clickComfirm();
        }
    }
};

// 提示单例
let messageInstance;
function getMessageInstance () {
    messageInstance = messageInstance || Message.newInstance();
    return messageInstance;
}
function show() {
    // 等待接口调用的时候再实例化组件，避免进入页面就直接挂载到body上
    let instance = getMessageInstance();
    instance.show(...arguments);
}
function close(){
    let instance = getMessageInstance();
    instance.close();
}
Vue.prototype.$message = {
    show,
    close
}
export default {
    show,
    close
}