// ***********提供给页面的公用方法，

/**
 * @description 监听事件 on(element, event, handler)
 */
const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    }
  }
})();

/**
 * @description 解绑事件 off(element, event, handler)
 */
const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    }
  }
})();
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
  on,
  off,
  getType,
  /**
   * @param {Number}  animateTime 动画时间
   * @param {String} dom 滚动元素
   * @param {Number}  position 滚动到指定位置
   * @description 滚动动画，可以不填参数，默认为body滚动到顶部 scroll2Top(10,document.body,0)
   */
  scroll2Top: function (animateTime = 10, dom, position = 0) {
    let element = dom;
    if (!dom) {
      element = document.documentElement || document.body;
    }
    var timer = setInterval(() => {
      var osTop = element.scrollTop - position;
      var ispeed = Math.floor(-osTop / 10);
      element.scrollTop = osTop + ispeed;
      if (osTop <= 0) {
        stopAnim();
      }
    }, animateTime)
    function stopAnim() {
      clearInterval(timer);
      timer = null;
      dom.onmousewheel = null;
    }
    dom.onmousewheel = stopAnim;//如果滚动就停止动画
  },
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
   * @description 时间转换（YYYY-MM-DD HH:mm:ss）
   * @param {Date} date 日期 
   * @param {String} format 日期格式
   */
  moment(date, format = 'YYYY-MM-DD HH:mm:ss') {
    if (!date) return '';
    let dateTime = new Date(date);
    let opt = {
      "Y+": dateTime.getFullYear().toString(),        // 年
      "M+": (dateTime.getMonth() + 1).toString(),     // 月
      "D+": dateTime.getDate().toString(),            // 日
      "H+": dateTime.getHours().toString(),           // 时
      "m+": dateTime.getMinutes().toString(),         // 分
      "s+": dateTime.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    let ret;
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(format);
      if (ret) {
        format = format.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")));
      };
    };
    return format;
  },
  /**
   * 将所有的搜索对象进行遍历，只提取有值的数据
   * @param {Object} obj 
   * @returns '?key1=value1&key2=value2'
   */
  stringifyObj(obj) {
    if (!finalExport.isObject(obj)) {
      return '';
    }
    var params = [];
    for (var v in obj) {
      let value = obj[v];
      if (finalExport.isObject(value)) continue;
      if (value || value === 0) params.push('&' + v + "=" + encodeURIComponent(value));
    }
    return params.length?('?'+(params.join('').slice(1))):'';
  },
  /**
   * 判断是否为对象
   * @param {any} val 
   * @returns true/false
   */
  isObject(val) {
    return getType(val) === "object";
  },
  /**
   * 提供一个捕获异步后返回数据的方法
   * @param {Function} asyncFn 
   * @param {any} params asyncFn的参数
   * @returns Promise
   */
  async asyncCapture(asyncFn,params){
    let err='',data={};
    try{
      data = await asyncFn(params);
    }catch(e){
      err = e
    }
    return {err,data};
  },
  isZh(){
    return true;
  },
  // 处理拖动事件
  handleDrag(e,dom){
    let bodyDom = document.querySelector(dom);
    let pageX = 0,
        pageY = 0,
        transformX = 0,
        transformY = 0,
        canMove = false;
    let transform = /\(.*\)/.exec(bodyDom.style.transform);
    if (transform) {
      transform = transform[0].slice(1, transform[0].length - 1);
      let splitxy = transform.split('px, ');
      transformX = parseFloat(splitxy[0]);
      transformY = parseFloat(splitxy[1].split('px')[0]);
    }
    pageX = e.pageX;
    pageY = e.pageY;
    canMove = true;
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
    document.onmousemove = handleMousemove;
    document.onmouseup = handleMouseup;
  },
  recoverTransform(dom){
    let bodyDom = document.querySelector(dom)
    setTimeout(() => {
      bodyDom && (bodyDom.style.transform = '')
    }, 500);
  },
}

module.exports = finalExport;



