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
    setProducts (state, products) {
      state.products = products
    },
    pushProductToCart (state, product) {
      state.items.push({
        id: product.id,
        quantity: 1
      })
    },
    incrementItemQuantity (state, cartItem) {
      cartItem.quantity++
    },
    decrementProductIventory (state, { id }) {
      const product = state.products.find(product => product.id === id)
      product.inventory--
    }
  },
  actions: {
    getAllProducts ({ commit }) {
      shop.getProducts(products => { commit('setProducts', products) })
    },
    addProductToCart ({ state, commit }, product) {
      const cartItem = state.items.find(item => item.id === product.id)
      if (!cartItem) {
        commit('pushProductToCart', product)
      } else {
        commit('incrementItemQuantity', cartItem)
      }
      commit('decrementProductIventory', product)
    }
  },
  getters: {
    // items内のidと合致するproductのtitle, price, quantityを返す
    cartProducts: state => {
      return state.items.map(item => {
        const product = state.products.find(product => product.id === item.id)
        return {
          title: product.title,
          price: product.price,
          quantity: item.quantity
        }
      })
    },
    cartTotalPrice: (state, getters) => {
      return getters.cartProducts.reduce((total, product) => {
        return total + product.price * product.quantity
      }, 0)
    }
  },
  modules: {}
});
