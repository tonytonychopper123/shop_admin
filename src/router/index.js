import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
export default router