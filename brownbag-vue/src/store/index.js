import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth
  }
});

export const GLOBAL = {
  API_BASE_URL : process.env.VUE_APP_API_URL
}

