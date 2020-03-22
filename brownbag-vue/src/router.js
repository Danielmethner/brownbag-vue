import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import Login from './components/auth/Login.vue';
import Register from './components/auth/Register.vue';
import Imprint from './components/public/Imprint.vue';
import Contact from './components/public/Contact.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  data: {
    BASE_URL: 'http://localhost:8080'
  },
  routes: [
    {
      path: '/',
      name: 'home',
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
      path: '/contact',
      component: Contact
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
      path: '/broker',
      name: 'broker',
      // lazy-loaded
      component: () => import('./components/broker/BoardBroker.vue')
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      // lazy-loaded
      component: () => import('./components/trader/Portfolio.vue')
    },
    {
      path: '/orderbook',
      name: 'orderbook',
      // lazy-loaded
      component: () => import('./components/trader/Orderbook.vue')
    },
    {
      path: '/tradingdesk',
      name: 'tradingdesk',
      // lazy-loaded
      component: () => import('./components/trader/Tradingdesk.vue')
    },
    {
      path: '/assets',
      name: 'assets',
      // lazy-loaded
      component: () => import('./components/asset/AssetBase.vue')
    },


  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home', '/contact','/imprint'];
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
