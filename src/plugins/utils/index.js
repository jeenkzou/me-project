import CONFIG from '../config';//配置文件

/**
 * @description 自动读取文件并生成结果
 * @param {Object} ctx 上下文对象 
 * @returns {name:nameFile}
 */
function handleAutoCreate(ctx) {
  return ctx.keys().reduce((pre, item) => {
    let config = ctx(item);
    let dft = config.default || config;
    if (!dft.name) {
      throw new ReferenceError(`[${item}] component is lack of name prop,please check it.`);
    }
    pre[dft.name] = dft;
    return pre;
  }, {})
}
/**
 * @description 自动引入globals文件夹下的所有组件
 * @notice golobals文件夹下的所有文件都必须要有name字段
*/
const GLOBALS = require.context('../globals', false, /\.vue$/);
const CMPTS = handleAutoCreate(GLOBALS);

/**
 * @description 自动引入directives下的自定义指令
 * @notice directives文件夹下的所有文件都必须要有name字段
*/
const DIRECTS = require.context('./directives', false, /.js$/);
const DIRS = handleAutoCreate(DIRECTS);

/**
 * @description 引入自定义方法并导出
 */
import meFun from './fun-tools/functions.js';
import meBool from './fun-tools/boolean';
const meFuns = { ...meBool, ...meFun };

import '../instance/toast';
import '../instance/modal';
import '../instance/message';
import APIS from '../api';

/**
 * @description 引入事件监听者
 */
import listener from './listener';

/**
 * @description 插件安装器
 * @param Vue vue
 * @param opt 参数配置
 */
const install = function (Vue, opt = {}) {
  // 如果安装了，就无需安装
  if (install.installed) return;
  // ======设置所有vue全局方法========
  Vue.prototype.$funs = meFuns;//functions的简写
  Vue.prototype.$listener = listener;//事件触发监听器
  if (CONFIG.apiAutoInsert) {
    Vue.prototype.$api = APIS;//事件触发监听器
  }

  // =======设置所有指令==========
  for (let d in DIRS) {
    Vue.directive(d, DIRS[d]);
  }
  // ====设置所有组件=======
  Object.keys(CMPTS).forEach(item => {
    Vue.component(CMPTS[item].name, CMPTS[item]);
  })
}
// ************自动安装注入到vue**************
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
// ***********最终导出的对象
const finalExports = {
  ...CMPTS,//导出所有组件
  // funs: meFuns,//导出所有对外方法
  install: install,//导出vue方法
}
export default finalExports;