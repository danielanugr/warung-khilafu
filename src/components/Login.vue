<template>
  <div class="pop-up">
    <div class="container">
      <div class="card pop-up-form p-5">
        <div id="login-row" class="row align-items-center">
          <div id="login-column" v-if="login == true" class="col-md-12">
            <div id="login-box" class="col-md-12">
              <form
                id="login-form"
                @submit.prevent=""
                class="form"
                action=""
                method="post"
              >
                <h3 class="text-center text-blue">Login</h3>
                <div class="form-group">
                  <label for="email" class="text-blue">Email :</label><br />
                  <input
                    v-model="emailFormLogin"
                    type="email"
                    name="email"
                    id="email-login"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="password" class="text-blue">Password :</label
                  ><br />
                  <input
                    v-model="passwordFormLogin"
                    type="password"
                    name="password"
                    id="password-login"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="submit"
                    class="btn btn-blue pl-5 pr-5 mr-1"
                    @click.prevent="loginProccess"
                    value="Login"
                  />
                  <input
                    type="submit"
                    class="btn btn-outline-danger btn-md"
                    @click.prevent="closeForm"
                    value="Cancel"
                  />
                  <br />
                  Dont have an account?
                  <a href="#" @click.prevent="toogleLogin" class="text-blue"
                    >Register here</a
                  >
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          id="login-row"
          v-if="login == false"
          class="row align-items-center"
        >
          <div id="login-column" class="col-md-12">
            <div id="login-box" class="col-md-12">
              <form
                id="login-form"
                @submit.prevent=""
                class="form"
                action=""
                method="post"
              >
                <h3 class="text-center text-blue">Register</h3>
                <div class="form-group">
                  <label for="email" class="text-blue">Email :</label><br />
                  <input
                    v-model="emailFormRegist"
                    type="email"
                    name="email"
                    id="email-login"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="password" class="text-blue">Password :</label
                  ><br />
                  <input
                    v-model="passwordFormRegist"
                    type="password"
                    name="password"
                    id="password-login"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="submit"
                    class="btn btn-blue btn-md mr-1"
                    @click.prevent="registProccess"
                    value="Register"
                  />
                  <input
                    type="submit"
                    class="btn btn-outline-danger btn-md"
                    @click.prevent="closeForm"
                    value="Cancel"
                  />
                  <br />
                  Already have an account?
                  <a href="#" @click.prevent="toogleLogin" class="text-blue"
                    >Sign in here</a
                  >
                  <!-- <GoogleLogin class="float-right" :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin> -->
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../api/axios'
export default {
  name: 'LoginForm',
  data () {
    return {
      emailFormLogin: '',
      passwordFormLogin: '',
      emailFormRegist: '',
      passwordFormRegist: '',
      login: true,
      errMessage: ''
    }
  },
  methods: {
    closeAlert () {
      this.errMessage = ''
    },
    toogleLogin () {
      this.login = !this.login
    },
    loginProccess () {
      axios
        .post('/login', {
          email: this.emailFormLogin,
          password: this.passwordFormLogin
        })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          this.$store.commit('TOOGLE_LOGINFORM')
          this.$store.commit('TOOGLE_LOGGEDIN')
          this.$store.dispatch('fetchAll')
        })
        .catch(err => {
          console.log(err)
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong email or password'
          })
        })
    },
    registProccess () {
      axios
        .post('/register', {
          email: this.emailFormRegist,
          password: this.passwordFormRegist
        })
        .then(({ data }) => {
          this.emailFormRegist = ''
          this.passwordFormRegist = ''
          this.toogleLogin()
        })
        .catch(err => {
          console.log(err)
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email already taken'
          })
        })
    },
    closeForm () {
      this.$store.commit('TOOGLE_LOGINFORM')
    }
  }
}
</script>

<style>
.pop-up {
  position: fixed;
  z-index: 999;
  height: 100vh;
  width: 100%;
  background-color: #61460b2f;
}
.pop-up-form {
  background-color: #fffffe;
  border-radius: 15px;
  color: white;
  margin: 15% auto;
  max-width: 500px;
}
.text-blue {
  color: #2196f3;
}
.btn-blue {
  background-color: #2196f3;
}
.btn-blue:hover {
  background-color: #03a9f4;
  color: white;
}

.form-group {
  color: black;
}
</style>
