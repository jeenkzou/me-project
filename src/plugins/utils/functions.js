// ***********提供给页面的公用方法，

/**
 * @description 监听事件 on(element, event, handler)
 */
export const on = (function () {
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
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
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
})()
export default {
  /**
   * @param {Number}  animateTime 动画时间
   * @param {String} dom 滚动元素
   * @param {Number}  position 滚动到指定位置
   * @description 滚动动画，可以不填参数，默认为body滚动到顶部 scroll2Top(10,document.body,0)
   */
  scroll2Top:function(animateTime=10,dom,position=0) {
    let element = dom;
    if(!dom){
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
    function stopAnim(){
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
  moment(date,format = 'YYYY-MM-DD HH:mm:ss') {
    if(!date) return '';
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
  on:on,
  off:off
}



