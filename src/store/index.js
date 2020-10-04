import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    getCategories: () => 
      axios.get('/category').then((result) => {
          return result.data;
      }),
    getProducts: ({commit}, params) => 
      axios.get('/product?page=' + params.page + '&perPage=' + params.perPage + '&resume=' + params.resume).then((result) => {
          return result.data;
      }),
    getProductDetail: ({commit}, id) => 
      axios.get('/product/' + id).then(result => {
          return result.data;
      }),
    updateProduct: ({commit}, params) => 
      axios.post('/product/' + params.id, params.data, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      }).then(result => {
          return result.data;
      }),
    deleteProduct: ({commit}, id) => 
      axios.delete('/product/' + id).then(result => {
          return result.data;
      }),
    saveProduct: ({commit}, data) => 
      axios.post('/product', data, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      }).then(result => {
          return result.data;
      })
  },
});