import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import { asset } from './asset.module';
import { party } from './party.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth, asset, party
  }
});

// GLOBAL VARIABLES AND ENUMERATIONS
export const GLOBAL = {
  API_BASE_URL: process.env.VUE_APP_API_URL,
  CURRENT_ENV: process.env.NODE_ENV,
  FIN_STMT_TYPE: {
    BAL_SHEET: 'BAL_SHEET',
    INCOME_STMT: 'INCOME_STMT'
  }
}

