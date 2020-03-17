import Vue from 'vue'
import VueRouter from 'vue-router'
// 路由懒加载
const Login  = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Login.vue')
const Home  = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Home.vue')
const Welcome  = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Welcome.vue')

const Users  = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../components/users/users.vue')
const Rights  = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../components/right/Rights.vue')
const Roles  = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../components/right/Roles.vue')

const Categories  = () => import(/* webpackChunkName: "Cate_Params" */ '../components/goods/Categories.vue')
const Params  = () => import(/* webpackChunkName: "Cate_Params" */ '../components/goods/Params.vue')

const Goods  = () => import(/* webpackChunkName: "Goods_AddGoods" */ '../components/goods/Goods.vue')
const AddGoods  = () => import(/* webpackChunkName: "Goods_AddGoods" */ '../components/goods/AddGoods.vue')

const Order  = () => import(/* webpackChunkName: "Order_Report" */ '../components/order/Order.vue')
const Report  = () => import(/* webpackChunkName: "Order_Report" */ '../components/report/Report.vue')
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
  }, {
    path: 'goods',
    component: Goods
  }, {
    path: 'goods/add',
    component: AddGoods
  },{
    path:'orders',
    component: Order
  },{
    path:'reports',
    component:Report
  }
  ]
}
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  var token = sessionStorage.getItem('token');
  if (!token) return next('/login')
  // 这里应该判断一下token是否正确
  next()
})
export default router
