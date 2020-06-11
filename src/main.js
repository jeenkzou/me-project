import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './plugins/less/main.less';

import mePlugin from './plugins/utils';
import {setTitle} from './plugins/utils/fun-tools/functions';

Vue.use(mePlugin);

Vue.config.productionTip = false;

//路由拦截
router.beforeEach((from,to,next)=>{
  setTitle('加载中...');
  next();
})
router.afterEach((from,to)=>{
  setTitle(from.meta.title);
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
