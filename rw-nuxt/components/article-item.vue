<template>
  <div class="article-preview">
    <div class="article-meta">
      <nuxt-link :to="'profile/' + article.author.username">
        <img :src="article.author.image" />
      </nuxt-link>
      <div class="info">
        <nuxt-link :to="'profile/' + article.author.username">
          {{ article.author.username }}
        </nuxt-link>
        <span class="date">{{ article.updatedAt | dater }}</span>
      </div>
      <button
        class="btn btn-outline-primary btn-sm pull-xs-right"
        @click="setFavorite"
      >
        <i class="ion-heart"></i> {{ article.favoritesCount }}
      </button>
    </div>
    <nuxt-link :to="'/article/' + article.slug" class="preview-link">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
    </nuxt-link>
  </div>
</template>
<script>
import { addFavorite, deleteFavorite } from '~/api/article'
import { dater } from '@/utils/filters'
export default {
  name: 'ArticleItem',
  filters: {
    dater,
  },
  props: {
    article: {
      type: Object,
      default: (_) => ({}),
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    setFavorite() {
      // 请求中防止二次请求
      if (this.loading) return
      this.loading = true
      const func = this.article.favorited ? deleteFavorite : addFavorite
      func(this.article.slug)
        .then((res) => {
          this.loading = true
          this.getArticles(this.type, false)
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
}
</script>
