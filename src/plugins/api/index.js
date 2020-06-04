/**
 * 自动导入api结尾的文件，并全部注入到APIS一个对象中，方便全局导入
 */

const ctx = require.context('.',false,/.api.js$/);
const APIS = {};
ctx.keys().forEach((item)=>{
  let name = item.split('.')[1].slice(1);
  let config = ctx(item);
  let dft = config.default || config;
  APIS[name] = dft;
})
export default APIS;