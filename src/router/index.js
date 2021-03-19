import { createRouter, createWebHashHistory } from "vue-router"

const VueRouter = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('/@/views/Home.vue')
    },
    {
      path: '/next-page',
      component: () => import('/@/views/NextPage.vue')
    }
  ]
})
//配置路由
export default VueRouter
