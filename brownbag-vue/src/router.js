import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import Login from './components/auth/Login.vue';
import Register from './components/auth/Register.vue';
import Imprint from './components/public/Imprint.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  data: {
    BASE_URL: 'http://localhost:8080'
  },
  routes: [
    {
      path: '',
      component: Home
    },
    {
      path: '/',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/architecture',
      component: () => import('./components/public/Architecture.vue')
    },
    {
      path: '/tech-stack',
      component: () => import('./components/public/TechStack.vue')
    },
    {
      path: '/trading-simulation',
      component: () => import('./components/public/TradingSimulation.vue')
    },
    {
      path: '/data-privacy',
      component: () => import('./components/public/DataPrivacy.vue')
    },
    {
      path: '/imprint',
      component: Imprint
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./components/auth/Profile.vue')
    },
    {
      path: '/brokerage',
      name: 'brokerage',
      // lazy-loaded
      component: () => import('./components/broker/BrokerBase.vue')
    },
    {
      path: '/private',
      name: 'private',
      // lazy-loaded
      component: () => import('./components/personal/PrivateBase.vue')
    },
    {
      path: '/business',
      name: 'business',
      // lazy-loaded
      component: () => import('./components/business/BusinessBase.vue')
    },
    {
      path: '/marketresearch',
      name: 'marketresearch',
      // lazy-loaded
      component: () => import('./components/market-research/MarketResearch.vue')
    },
    {
      path: '/system-control',
      name: 'system-control',
      // lazy-loaded
      component: () => import('./components/settings/SystemControl.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['', '/', '/home', '/architecture', '/tech-stack', '/trading-simulation', '/login', '/register', '/data-privacy', '/imprint'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});
