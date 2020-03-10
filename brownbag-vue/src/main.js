import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import store from './store';
import Bootstrap from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import VeeValidate from 'vee-validate';
import {Tabs, Tab}  from 'vue-tabs-component';

Vue.component('tabs', Tabs);
Vue.component('tab', Tab);
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';


Vue.use(Tabs);
Vue.use(Bootstrap);

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

Vue.config.productionTip = false;
Vue.use(VeeValidate);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.filter('toCurrency', function (value) {
  if (typeof value !== "number") {
    return value;
  }
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });
  return formatter.format(value);
});



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
