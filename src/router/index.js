import { createRouter, createWebHistory } from 'vue-router'
import Product from '@/components/Product.vue'
import Products from '@/components/Products.vue'


const routes = [
  { path: '/', name:'Products', component: Products },
  { path: '/product/:id', name: 'Product', component: Product }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
