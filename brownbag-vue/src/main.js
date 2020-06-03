import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import store from './store';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import VeeValidate from 'vee-validate';
import { Tabs, Tab } from 'vue-tabs-component'; // tab in order field
import moment from 'moment';
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


Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Tabs);
// Vue.use(Vuex);
Vue.use(VeeValidate, {
  // This is the default
  inject: true,
  // Important to name this something other than 'fields'
  fieldsBagName: 'veeFields',
  // This is not required but avoids possible naming conflicts
  errorBagName: 'veeErrors'
});

Vue.config.productionTip = false;

// MONETARY AMOUNT
Vue.filter('toCurrency', function (value) {
  if (typeof value !== "number") {
    return value;
  }
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  });
  return formatter.format(value);
});
Vue.filter('toNumber', function (value) {
  if (typeof value !== "number") {
    return value;
  }
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    useGrouping: true,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return formatter.format(value);
});

Vue.filter('toPercent', function (value) {
  if (typeof value !== "number") {
    return value;
  }
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    useGrouping: true,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return formatter.format(value);
});
// TIMESTAMP
Vue.filter('toTimestamp', function (value) {
  let regex = new RegExp('\\d\\d\\d\\d-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d.\\d\\d\\d\\+\\d\\d\\d\\d');
  if (!(regex.test(value))) {
    return value;
  }
  if (value) {
    return moment(String(value)).format('DD. MMM  YYYY hh:mm:ss')
  }
});

// LOCAL TIMESTAMP
Vue.filter('toLocalDateTime', function (value) {
  let regex = new RegExp('\\d\\d\\d\\d-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d');
  if (!(regex.test(value))) {
    return value;
  }
  if (value) {
    return moment(String(value)).format('DD. MMM  YYYY')
  }
});

// LOCAL DATE
Vue.filter('toLocalDate', function (value) {
  let regex = new RegExp('\\d\\d\\d\\d-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d');
  if (!(regex.test(value))) {
    return value;
  }
  if (value) {
    return moment(String(value)).format('DD. MMM  YYYY')
  }
});

// CAMEL CASE PRETTY PRINT
Vue.filter('camelCasePrettyPrint', function (value) {
  const toUppercase = str => str.toUpperCase();
  return value.replace(/[A-Z]/g, ' $&').replace(/^./, toUppercase);

});

// BUY/SELL
Vue.filter('buySell', function (value) {
  if (value === 'BUY') {
    return
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
