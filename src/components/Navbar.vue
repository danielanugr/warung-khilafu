<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary">
    <a @click.prevent="home" class="navbar-brand text-light fw-bolder" href="#"
      >Warung Khilafu</a
    >
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div
      class="collapse navbar-collapse flex-row-reverse"
      id="navbarSupportedContent"
    >
      <ul class="navbar-nav">
        <li @click.prevent="wishlist" class="nav-item">
          <a class="nav-link text-light fw-bold" href="#">Wishlist</a>
        </li>
        <li @click.prevent="cart" class="nav-item">
          <a class="nav-link text-light fw-bold" href="#">Cart</a>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <a
            @click.prevent="showLogin"
            class="nav-link text-light fw-bold"
            href="#"
            >Login</a
          >
        </li>
        <li class="nav-item dropdown" v-if="isLoggedIn">
          <a
            class="nav-link dropdown-toggle text-light fw-bold"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {{ email }}
          </a>
          <div
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="navbarDropdown"
          >
            <a class="dropdown-item" @click.prevent="history" href="#"
              >Purchase History</a
            >
            <div class="dropdown-divider"></div>
            <a @click.prevent="logout" class="dropdown-item" href="#">Logout</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: ['categories'],
  data () {
    return {}
  },
  methods: {
    showLogin () {
      this.$store.commit('TOOGLE_LOGINFORM')
    },
    home () {
      if (this.$route.name !== 'Home') {
        this.$router.push('/')
      }
      this.$store.dispatch('fetchProducts')
    },
    logout () {
      localStorage.clear()
      this.$store.commit('TOOGLE_LOGGEDIN')
      this.$notification.warning({
        message: 'Logged Out',
        description: 'Successfully logged out'
      })
      if (this.$route.name !== 'Home') {
        this.$router.push('/')
      }
    },
    cart () {
      if (!localStorage.access_token) {
        this.$store.commit('TOOGLE_LOGINFORM')
      } else {
        this.$router.push('/cart')
      }
    },
    history () {
      this.$router.push('/history')
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    },
    email () {
      return this.$store.state.userEmail
    }
  }
}
</script>

<style>
.fw-bolder {
  font-weight: bolder;
}

.fw-bold {
  font-weight: 600;
}
</style>
