import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import appModule from './modules/app'

export default new Vuex.Store({
  ...appModule,
  modules: {}
})
