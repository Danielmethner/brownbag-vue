import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import { router } from './router';
import store from './store';
import Bootstrap from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import VeeValidate from 'vee-validate';
import {Tabs, Tab}  from 'vue-tabs-component'; // tab in order field

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('tabs', Tabs);
Vue.component('tab', Tab);

Vue.use(Bootstrap);
Vue.use(Tabs);
Vue.use(Vuex);
Vue.use(VeeValidate);

Vue.config.productionTip = false;

Vue.filter('toCurrency', function (value) {
  if (typeof value !== "number") {
    return value;
  }
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
  return formatter.format(value);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
