// import Vue from 'vue'

// import VueRouter from 'vue-router'
/* eslint-disable */

import Login from '@/components/login/Login.vue'
const Home = () => import('@/components/home/Home.vue')
const play = () => import('@/components/play/play.vue')
const user = () => import('@/components/user/user.vue')
const right = () => import('@/components/right/right.vue')
const categories = () => import('@/components/categories/Categories')
const goods = () => import('@/components/goods/Goods.vue')
const goodsAdd = () => import('@/components/goodsAdd/goodsAdd.vue')
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        { path: '/roles', name: 'play', component: play },
        { path: '/users', name: 'user', component: user },
        { path: '/rights', name: 'right', component: right },
        { path: '/categories', name: 'categories', component: categories },
        { path: '/goods', name: 'goods', component: goods },
        { path: '/goods-add', name: 'goodsAdd', component: goodsAdd }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('token')
    token ? next() : next('/login')
  }
})

export default router
