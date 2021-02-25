<template>
  <div id="app">
    <Login v-if="loginForm" />
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Login from './components/Login'
export default {
  name: 'App',
  components: {
    Navbar,
    Login
  },
  computed: {
    loginForm () {
      return this.$store.state.loginForm
    }
  },
  created () {
    if (localStorage.access_token) {
      this.$store.dispatch('fetchAll')
      this.$store.commit('TOOGLE_LOGGEDIN')
    } else {
      this.$store.dispatch('fetchProducts')
      this.$store.dispatch('fetchCategories')
    }
  }
}
</script>
<style></style>
