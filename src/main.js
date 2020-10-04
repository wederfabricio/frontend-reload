import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import { BootstrapVue, BootstrapVueIcons, FormSelectPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css'

axios.defaults.baseURL = process.env.BASEURL + '/api';

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.prototype.$storageApi = process.env.BASEURL + '/storage';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
