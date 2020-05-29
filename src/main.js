import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './plugins/less/main.less';

import './plugins/less/test.less';

import mePlugin from './plugins/utils';

Vue.use(mePlugin);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
