export default {
  // 监听者模式
  callback:{},//存储所有回调的容器{name:function}
  //触发指定名称的回调
  on:function(name,fn){
    this.callback[name] = fn;
  },
  //只监听一次，通过对象和function来区别
  once:function(name,fn){
    this.callback[name] = {
      callback:fn
    }
  },
  //取消监听
  off:function(name){
    delete this.callback[name];
  },
  //触发事件
  emit:function(name,...args){
    let fn = this.callback[name];
    if(!fn) throw new ReferenceError('callback is undefined');
    //如果是方法，表示可以多次触发
    if(typeof fn === 'function'){
      fn(...args);
    }
    //如果是对象，表示只触发一次
    else{
      fn.callback(...args);
      this.off(name);
    }
  }
}