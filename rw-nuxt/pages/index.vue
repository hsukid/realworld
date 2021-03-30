<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li
                v-if="auth.id"
                class="nav-item"
                @click="getArticles('feed', false, true)"
              >
                <span :class="['nav-link', { active: type === 'feed' }]">
                  Your Feed
                </span>
              </li>
              <li class="nav-item" @click="getArticles('global', false, true)">
                <span :class="['nav-link', { active: type === 'global' }]">
                  Global Feed
                </span>
              </li>
              <li
                v-if="tag"
                class="nav-item"
                @click="getArticles('tag', false, true)"
              >
                <span :class="['nav-link', { active: type === 'tag' }]">
                  # {{ tag }}
                </span>
              </li>
            </ul>
          </div>

          <div v-show="loading">Loading articles...</div>
          <div v-show="!loading">
            <template v-if="articles.length === 0">
              <div class="article-preview">No articles are here... yet.</div>
            </template>
            <template v-for="article in articles">
              <ArticleItem :key="article.id" :article="article" />
            </template>
          </div>

          <nav>
            <ul class="pagination">
              <template v-for="page in Math.ceil(articlesCount / 20)">
                <li
                  :key="page"
                  :class="['page-item', { active: page - 1 === current }]"
                  @click="handleQuery(page - 1)"
                >
                  <a class="page-link" href="javascript: void(0)">{{ page }}</a>
                </li>
              </template>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <ul class="tag-list">
              <template v-for="t in tags">
                <li
                  :key="t"
                  class="tag-pill tag-default"
                  @click="tagArticles(t)"
                >
                  {{ t }}
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleItem from '@/components/article-item'
import { listArticles, listFeed, listTags } from '~/api/article'
export default {
  name: 'Home',
  components: {
    ArticleItem,
  },
  async asyncData(context) {
    try {
      const { auth } = context.store.state
      let res = {}
      const type = auth && auth.id ? 'feed' : 'global'
      if (type === 'feed') {
        res = await listFeed()
      } else {
        res = await listArticles()
      }
      return { ...res.data, type }
    } catch (err) {
      return {
        articles: [],
        articlesCount: 0,
        type: 'global',
      }
    }
  },
  data() {
    return {
      type: '',
      articles: [],
      articlesCount: 0,
      loading: false,
      favoritting: false,
      tags: [],
      tag: '',
      current: 0,
    }
  },
  computed: {
    auth() {
      return this.$store.state.auth || {}
    },
  },
  mounted() {
    this.getTags()
  },
  methods: {
    handleQuery(page) {
      this.current = page
      this.getArticles(this.type)
    },
    async getArticles(type, loading = true, reset = false) {
      let res = {}
      this.type = type
      this.loading = loading
      if (reset) {
        this.current = 0
      }
      const query = { offset: this.current }
      if (type === 'global') {
        res = await listArticles(query)
      } else if (type === 'tag') {
        query.tag = this.tag
        res = await listArticles(query)
      } else {
        res = await listFeed(query)
      }
      this.loading = false
      this.articles = res.data.articles
      this.articlesCount = res.data.articlesCount
    },
    getTags() {
      listTags()
        .then((res) => {
          const { tags } = res.data
          this.tags = tags
        })
        .catch(() => {})
    },
    tagArticles(tag) {
      this.tag = tag
      this.getArticles('tag')
    },
  },
}
</script>
