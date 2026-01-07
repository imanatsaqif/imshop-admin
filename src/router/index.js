import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import DashboardHome from '@/views/DashboardHome.vue'
import Products from '@/views/Products.vue'
import Stats from '@/views/Stats.vue'
import Users from '@/views/Users.vue'

const routes = [{
  path: '/', component: DashboardLayout,
  children:[
    {path: '', component: DashboardHome, name: 'home'},
    {path: 'products', component: Products, name: 'products'},
    {path: 'stats', component: Stats, name: 'stats'},
    {path: 'users', component: Users, name: 'users'}
  ]
}]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
