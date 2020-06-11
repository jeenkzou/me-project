/** 
 * @param {Object}  binding = {trigger//拖动的元素，body//设置样式的元素,recover//是否更新的时候恢复到原来的位置}
 * @description 拖动--主要适用于遮罩层
*/
import {handleDrag,recoverTransform} from '../fun-tools/drag';
import { on } from '../fun-tools/functions';
export default {
  name:'drag',
  inserted: (el, binding) => {
    let triggerDom = document.querySelector(binding.value.trigger)
    triggerDom.style.cursor = 'move'
    const handleMousedown = e => {
      handleDrag(e,binding.value.body);
    } 
    on(triggerDom, 'mousedown', handleMousedown);
  },
  update: (el, binding) => {
    if (!binding.value.update) return;
    recoverTransform(binding.value.body);
  },
  unbind: (el, binding) => {
    if (!binding.value.recover) return
    recoverTransform(binding.value.body);
  }
}
