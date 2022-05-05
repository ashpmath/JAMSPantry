import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login-Page.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard-Page.vue'),
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: () => import(/* webpackChunkName: "inventory" */ '../views/Inventory-Page.vue'),
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/kiosk',
    name: 'Kiosk',
    component: () => import(/* webpackChunkName: "kiosk" */ '../views/Kiosk-Page.vue'),
    meta: {
      authRequired: false,
    },
  },
  {
    path: '/kiosk-login',
    name: 'Kiosk Login',
    component: () => import(/* webpackChunkName: "kiosk-login" */ '../views/Kiosk-Login-Page.vue'),
    meta: {
      authRequired: false,
    },
  },
  {
    path: '/remote-login/:key',
    name: 'Remote Login',
    component: () => import(/* webpackChunkName: "remote-login" */ '../views/Remote-Login-Page.vue'),
    meta: {
      authRequired: false,
    },
  },
  {
    path: '/remote-confirmation',
    name: 'Remote Confirmation',
    component: () => import(/* webpackChunkName: "remote-confirmation" */ '../views/Remote-Confirmation.vue'),
    meta: {
      authRequired: false,
    },
  },
  {
    path: '/analytics',
    name: 'Analytics Page',
    component: () => import(/* webpackChunkName: "analytics-page" */ '../views/Analytics-Page.vue'),
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/home',
    name: 'Home Page',
    component: () => import(/* webpackChunkName: "home-page" */ '../views/Home-Page.vue'),
    meta: {
      authRequired: true,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        next()
      }
      else {
        next({
          path: '/',
        })
      }
    })
  }
  else if (to.path == '/kiosk' && Object.keys(to.params).length == 0) {
    next({
      path: '/kiosk-login',
    })
  }
  else {
    next()
  }
})

export default router