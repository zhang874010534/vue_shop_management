import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/users/users.vue'
import Rights from '../components/right/Rights.vue'
import Roles from '../components/right/Roles.vue'
import Categories from '../components/goods/Categories.vue'
import Params from '../components/goods/Params.vue'
Vue.use(VueRouter)
const routes = [{
  path: '/',
  redirect: '/login'
},
{
  path: '/login',
  component: Login
},
{
  path: '/home',
  component: Home,
  redirect: '/home/welcome',
  children: [{
    path: 'welcome',
    component: Welcome
  }, {
    path: 'users',
    component: Users
  }, {
    path: 'rights',
    component: Rights
  }, {
    path: 'roles',
    component: Roles
  }, {
    path: 'categories',
    component: Categories
  }, {
    path: 'params',
    component: Params
  }]
}
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  var token = sessionStorage.getItem('token')
  if (!token) return next('/login')
  // 这里应该判断一下token是否正确
  next()
})
export default router
