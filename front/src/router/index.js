import Vue from 'vue'
import VueRouter from 'vue-router'

// 安装插件
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('../views/login.vue') },
  { path: '/map', component: () => import('../views/map.vue') },
  {
    path: '/home',
    component: () => import('../views/home.vue'),
    redirect: '/home/addUser',
    children: [
      { path: 'addUser', component: () => import('../views/addUser.vue') },
      { path: 'author', component: () => import('../views/author.vue') },
      { path: 'userConfig', component: () => import('../views/userConfig.vue') },
      { path: 'personIntro', component: () => import('../views/personIntro.vue') },
      { path: 'personDetail', component: () => import('../views/personDetail.vue'), name: 'personDetail' },
      { path: 'movie', component: () => import('../views/movie.vue') },
      { path: 'favorite', component: () => import('../views/favorite.vue') },
      { path: 'community', component: () => import('../views/community.vue') },
      { path: 'information', component: () => import('../views/information.vue') },
      { path: 'myUnity', component: () => import('../views/myUnity.vue') },
      { path: 'systemConfig', component: () => import('../views/systemConfig.vue') }
    ]
  },
  { path: '*', component: () => import('../views/404.vue') }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// router.beforeEach((to, from, next) => {
//   const token = window.localStorage.getItem('token')
//   const whiteList = ['/login']
//   if (!token && !whiteList.includes(to.path)) {
//     Vue.prototype.$message.error('您还没登录哦')
//     return next('/login')
//   }
//   next()
// })

export default router
