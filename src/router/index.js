import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// Paga Not Found
import PageNotFound from '../views/PageNotFound'
// Curd Routes
import Curd from '../views/Curd/Routes/routes'
// Auth Route
import Auth from '../views/Auth/Pages/Auth.vue'
import AuthRoute from '../views/Auth/Routes/routes'
// Admin
import Admin from '../views/Admin/Pages/Admin.vue'
import AdminRoute from '../views/Admin/Routes/routes'
// User
import User from '../views/User/Pages/User.vue'
import UserRoute from '../views/User/Routes/routes'

Vue.use(VueRouter)

// General Info 
let isAuthenticated;
let role;
if(JSON.parse(localStorage.getItem('userData'))){
  role = JSON.parse(localStorage.getItem('userData')).role
}

const routes = [
  // Defulat Route
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // Page Not Found
  {
    path: '*',
    name: 'Page Not Found',
    component: PageNotFound
  },
  // Login Page
  {
    path: '/auth',
    component: Auth,
    children: AuthRoute
  },
  //  Admin
  {
    path: '/admin',
    component: Admin,
    beforeEach: (to, from, next) => {
      try {
        isAuthenticated = localStorage.getItem('authenticated')
      } catch (error) {
        return next({ path: '/' })
      }
      return (isAuthenticated && (role === 'admin')) ? next() : next({ path: '/' })
    },
    children: AdminRoute
  },
  //  User
  {
    path: '/user',
    component: User,
    beforeEach: (to, from, next) => {
      try {
        isAuthenticated = localStorage.getItem('authenticated')
      } catch (error) {
        return next({ path: '/' })
      }
      return (isAuthenticated && role === 'user') ? next() : next({ path: '/' })
    },
    children: UserRoute
  },
  // Curd Page
  {
    path: '/curd',
    beforeEnter: (to, from, next) => {
      try {
        isAuthenticated = localStorage.getItem('authenticated')
      } catch (error) {
        return next({ path: '/' })
      }
      return isAuthenticated ? next() : next({ path: '/' })
    },
    component: {
      render(c) {
        return c('router-view');
      },
    },
    children: Curd,
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
