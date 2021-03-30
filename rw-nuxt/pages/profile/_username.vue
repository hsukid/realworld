<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="user.image" class="user-img" />
            <h4>{{ user.username }}</h4>
            <p>{{ user.bio }}</p>
            <template v-if="user.username !== auth.username">
              <button
                :class="[
                  'btn btn-sm',
                  { 'btn-outline-secondary': user.following },
                  { 'btn-outline-primary': !user.following },
                ]"
                @click="setFollow"
              >
                <i v-show="!user.following" class="ion-plus-round"></i>
                &nbsp;
                {{ user.following ? 'UnFollow ' : 'Follow ' + user.username }}
              </button>
            </template>
            <template v-else>
              <button
                class="btn btn-sm btn-outline-primary"
                @click="$router.push('/settings')"
              >
                <i class="ion-gear-a"></i>
                &nbsp; Edit Profile Settings
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" @click="listArticles('user')">
                <span :class="['nav-link', { active: type === 'user' }]">
                  My Articles
                </span>
              </li>
              <li class="nav-item" @click="listArticles('favo')">
                <span :class="['nav-link', { active: type === 'favo' }]">
                  Favorited Articles
                </span>
              </li>
            </ul>
          </div>

          <div class="article-preview">
            <template v-for="article in userArticles">
              <ArticleItem :key="article.id" :article="article" />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleItem from '@/components/article-item'
import { getUser, addFollow, deleteFollow } from '@/api/user'
import { listArticles } from '@/api/article'
export default {
  name: 'ProfileUser',
  components: {
    ArticleItem,
  },
  data() {
    return {
      user: {},
      loading: false,
      userArticles: [],
      type: 'user',
    }
  },
  computed: {
    auth() {
      return this.$store.state.auth
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      getUser(this.$route.params.username)
        .then((res) => {
          const { data } = res
          this.user = data.profile
        })
        .catch((err) => {
          console.log(err)
        })
      this.listArticles('user')
    },
    setFollow() {
      if (this.loading) return
      const func = this.user.following ? deleteFollow : addFollow
      this.loading = true
      func(this.user.username)
        .then((res) => {
          this.loading = false
          this.init()
        })
        .catch(() => {
          this.loading = false
        })
    },
    listArticles(type) {
      this.type = type
      const username = this.$route.params.username
      const query =
        type === 'user' ? { author: username } : { favorited: username }
      listArticles(query)
        .then((res) => {
          const { data } = res
          this.userArticles = data.articles
          this.userArticlesCount = data.articlesCount
        })
        .catch(() => {})
    },
  },
}
</script>
