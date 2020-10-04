import Vue from 'vue'
import VueRouter from 'vue-router'
import ProductList from '@/components/ProductList'
import Product from '@/components/Product'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'ProductList',
      component: ProductList
    },
    {
      path: '/product/:id',
      name: 'Product',
      component: Product
    },
    {
      path: '/product',
      name: 'ProductNew',
      component: Product
    }
  ],
  mode: 'history'
})
