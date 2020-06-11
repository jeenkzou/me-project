// ***********提供给页面的公用方法，

  /**
   * 获取数据类型
   */
  const getType = (function () {
    return function (val) {
      let str = Object.prototype.toString.call(val);
      return str.slice(8, str.length - 1).toLowerCase();
    }
  })();
  const finalExport = {
    /**
     * @description 判断是pc端还是手机端
     * @returns Boolean true=>pc false=>phone
     */
    isPC() {
      var userAgentInfo = navigator.userAgent;
      var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    },
    /**
     * 判断是否为对象
     * @param {any} val 
     * @returns true/false
     */
    isObject(val) {
      return getType(val) === "object";
    },
    isFunction(val){
      return getType(val) === 'function';
    },
    isString(val){
      return getType(val) === 'string';
    },
    isArray(val){
      return getType(val) === 'array'
    },
    isZh(){
      return true;
    },
  }
  
  module.exports = finalExport;
  
  
  
  