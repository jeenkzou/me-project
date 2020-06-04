// toast.js
import Vue from 'vue';

// 具体的组件
import Toast from './Toast.vue';
Toast.newInstance = properties => {
    const props = properties || {};
	// 实例化一个组件，然后挂载到body上
    const Instance = new Vue({
        data: props,
        render:function(h){
            return h(Toast, {
                props: props
            });
        }
    });
    // 挂载到body上
    const component = Instance.$mount();
    document.body.appendChild(component.$el);
	// 通过闭包维护Toast组件的引用
    const toast = Instance.$children[0];
    return {
        show:function(){
            toast.show(...arguments)
        },
        success :function(){
            toast.success(...arguments)
        },
        error :function(){
            toast.error(...arguments)
        },
        warning :function(){
            toast.warning(...arguments)
        }
    }
};

// 提示单例
let messageInstance;
// 获取单例
function getToastInstance () {
    messageInstance = messageInstance || Toast.newInstance();
    return messageInstance;
}
function show(){
    let instance = getToastInstance();
    instance.show(...arguments);
}
function success(){
    let instance = getToastInstance();
    instance.success(...arguments);
}
function error(){
    let instance = getToastInstance();
    instance.error(...arguments);
}
function warning(){
    let instance = getToastInstance();
    instance.warning(...arguments);
}
// 将方法挂载到vue原型对象上，直接通过this调用
Vue.prototype.$toast = {
    show,
    success,
    error,
    warning
}
// 对外暴露的方法
export default {
    show,
    success,
    error,
    warning
}
