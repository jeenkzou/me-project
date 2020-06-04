/** 
 * @param {Number} v-focus='100'  100后自动获取焦点；
 * @description 表单自动获得焦点
*/
export default {
  name:'focus',
  inserted:(el,binding)=>{
    setTimeout(() => {
      el.focus()
    }, binding.value||0);
  }
}