<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sign In' : 'Sign up' }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register">
              Need an account?
            </nuxt-link>
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <li v-for="(er, k) in errors" :key="k">{{ k + ' ' + er }}</li>
          </ul>

          <form>
            <fieldset v-if="!isLogin" class="form-group">
              <input
                v-model="form.username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="form.email"
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="form.password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              @click="submit"
            >
              {{ isLogin ? 'Sign In' : 'Sign up' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { login, register } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  name: 'LoginPage',
  middleware: 'notAuthenticated',
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
      },
      errors: [],
    }
  },
  computed: {
    isLogin() {
      return this.$route.name === 'login'
    },
  },
  methods: {
    submit(e) {
      e.preventDefault()
      this.errors = {}
      const req = this.isLogin ? login : register
      req({ user: this.form })
        .then((res) => {
          const { data } = res
          this.$store.commit('setAuth', data.user) // mutating to store for client rendering
          Cookie.set('auth', data.user) // saving token in cookie for server rendering
          this.$router.replace('/')
        })
        .catch((err) => {
          // console.log(err.response)
          this.errors = err.response.data.errors
        })
    },
  },
}
</script>
