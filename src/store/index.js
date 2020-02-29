import Vue from "vue";
import Vuex from "vuex";
import shop from '@/api/shop.js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    items: [],
    checkoutStatus: null
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
    },
    setCheckoutStatus (state, status) {
      state.checkoutStatus = status
    },
    setCartItems (state, { items }){
      state.items = items
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
    },
    checkout ({ state, commit }, cartProducts) {
      // 購入処理を行う
      const savedCartItems = state.items

      shop.buyProducts (
        cartProducts,
        () => {
          // 購入処理成功時
          commit('setCheckoutStatus', true)
          commit('setCartItems', { items: [] })  // cartItemsを空にする
        },
        () => {
          // 購入処理失敗時
          commit('setCheckoutStatus', false)
          commit('setCartItems', { items: savedCartItems })
        }
      )
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
    },
    checkoutStatusMsg: state => {
      return state.checkoutStatus===null ? '' : 
        state.checkoutStatus ? 'successful' : 'failed'
    }
  },
  modules: {}
});
