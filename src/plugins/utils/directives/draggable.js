/** 
 * @param {Object}  binding = {trigger//拖动的元素，body//设置样式的元素,recover//是否更新的时候恢复到原来的位置}
 * @description 拖动--主要适用于遮罩层
*/
import { on } from '../functions'
export default {
  name:'drag',
  inserted: (el, binding, vnode) => {
    let triggerDom = document.querySelector(binding.value.trigger)
    triggerDom.style.cursor = 'move'
    let bodyDom = document.querySelector(binding.value.body)
    let pageX = 0
    let pageY = 0
    let transformX = 0
    let transformY = 0
    let canMove = false
    const handleMousedown = e => {
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
    }
    const handleMousemove = e => {
      let xOffset = e.pageX - pageX + transformX
      let yOffset = e.pageY - pageY + transformY
      // if (canMove) bodyDom.style.transform = `translate(${xOffset}px, ${yOffset}px)`
      if(canMove){
        let ot = bodyDom.offsetTop
        let absy = Math.abs(yOffset)
        if(yOffset<0 && ot<absy){
          bodyDom.style.transform = `translate(${xOffset}px, ${-ot}px)`
        }else{
          bodyDom.style.transform = `translate(${xOffset}px, ${yOffset}px)`
        }
      }
    }
    const handleMouseup = e => {
      canMove = false
    }
    on(triggerDom, 'mousedown', handleMousedown)
    // document.onmousemove = handleMousemove
    // document.onmouseup = handleMouseup
    on(document, 'mousemove', handleMousemove)
    on(document, 'mouseup', handleMouseup)
  },
  update: (el, binding, vnode) => {
    if (!binding.value.update) return
    let bodyDom = document.querySelector(binding.value.body)
    setTimeout(() => {
      bodyDom && (bodyDom.style.transform = '')
    }, 500);
  },
  unbind: (el, binding, vnode) => {
    if (!binding.value.recover) return
    let bodyDom = document.querySelector(binding.value.body)
    setTimeout(() => {
      bodyDom && (bodyDom.style.transform = '')
    }, 500);
  }
}
