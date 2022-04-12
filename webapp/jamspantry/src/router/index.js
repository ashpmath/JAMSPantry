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
      // authRequired: true,
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
  else {
    next()
  }
})

export default router