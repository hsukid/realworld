<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <nuxt-link class="navbar-brand" to="/">conduit</nuxt-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <nuxt-link class="nav-link" to="/" exact>Home</nuxt-link>
        </li>
        <template v-if="user.id">
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/create">
              <i class="ion-compose"></i>&nbsp;New Post
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/settings">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link :to="`/profile/${user.username}`" class="nav-link">
              <img ng-src="" class="user-pic" />
              {{ user.username }}
            </nuxt-link>
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/register">Sign up</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/login">Sign in</nuxt-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'AppHeader',
  computed: {
    user() {
      return this.$store.state.auth || {}
    },
  },
}
</script>
