import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/api/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    wishlists: [],
    cart: [],
    isLoggedIn: false,
    userEmail: '',
    loginForm: false,
    products: [],
    categories: [],
    history: []
  },
  mutations: {
    SET_USEREMAIL (state, payload) {
      state.userEmail = payload
    },
    TOOGLE_LOGINFORM (state) {
      state.loginForm = !state.loginForm
    },
    TOOGLE_LOGGEDIN (state) {
      state.isLoggedIn = !state.isLoggedIn
    },
    FETCH_PRODUCTS (state, payload) {
      state.products = payload
    },
    FETCH_CATEGORIES (state, payload) {
      state.categories = payload
    },
    FETCH_CART (state, payload) {
      state.cart = payload
    },
    FETCH_HISTORY (state, payload) {
      state.history = payload
    }
  },
  actions: {
    fetchProducts (context) {
      axios
        .get('/products')
        .then(result => {
          context.commit('FETCH_PRODUCTS', result.data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    filterProducts (context, payload) {
      if (payload === 'All') {
        context.dispatch('fetchProducts')
      } else {
        axios
          .get(`/products/${payload}`)
          .then(result => {
            context.commit('FETCH_PRODUCTS', result.data)
          })
          .catch(err => {
            console.log(err.response)
          })
      }
    },
    fetchCategories (context) {
      axios
        .get('/categories')
        .then(result => {
          context.commit('FETCH_CATEGORIES', result.data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    fetchCarts (context) {
      axios
        .get('/carts', {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(result => {
          context.commit('FETCH_CART', result.data.carts)
          context.commit('SET_USEREMAIL', result.data.userEmail)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    fetchHistory (context) {
      axios
        .get('/carts/history', {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(result => {
          context.commit('FETCH_HISTORY', result.data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    fetchAll ({ dispatch }) {
      dispatch('fetchCategories')
      dispatch('fetchProducts')
      dispatch('fetchCarts')
      dispatch('fetchHistory')
    }
  },
  modules: {}
})
