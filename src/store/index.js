import Vue from "vue";
import Vuex from "vuex";
import shop from '@/api/shop.js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    items: [],
  },
  mutations: {
    setProducts(state, products){
      state.products = products
    },
    pushProductToCart(state, product){
      state.items.push({
        id: product.id,
        quantity: 1
      })
    }
  },
  actions: {
    getAllProducts({commit}){
      shop.getProducts(products => { commit('setProducts', products) })
    },
    addProductToCart({commit}, product){
      commit('pushProductToCart', product)
    }
  },
  modules: {}
});
