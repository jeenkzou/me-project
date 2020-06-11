import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import {app} from './modules/app.js';
import {user} from './modules/user.js'

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
		app,
		user
  }
})
