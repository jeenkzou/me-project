const ctx = require.context('.',false,/.api.js$/);
const APIS = {};
ctx.keys().forEach((item)=>{
  let name = item.split('.')[1].slice(1);
  let config = ctx(item);
  let dft = config.default || config;
  APIS[name] = dft;
})
export default APIS;