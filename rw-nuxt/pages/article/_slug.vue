<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <div v-if="article.author" class="article-meta">
          <UserAvatar :info="{ ...article.author, date: article.updatedAt }" />

          <template v-if="article.author.username === auth.username">
            <button class="btn btn-sm btn-outline-primary" @click="editArticle">
              <i class="ion-edit"></i>
              &nbsp; Edit Article
            </button>
            &nbsp;&nbsp;
            <button
              class="btn btn-outline-danger btn-sm"
              @click="deleteArticle"
            >
              <i class="ion-trash-a"></i>
              &nbsp; Delete Article
            </button>
          </template>
          <template v-else>
            <button
              v-if="article.author && article.author.following"
              class="btn btn-sm btn-outline-primary"
            >
              <!-- <i class="ion-plus-round"></i> -->
              &nbsp; UnFollow {{ article.author.username }}
              <!-- <span class="counter">(10)</span> -->
            </button>
            <button v-else class="btn btn-sm btn-outline-secondary">
              <i class="ion-plus-round"></i>
              &nbsp; Follow {{ article.author && article.author.username }}
              <!-- <span class="counter">(10)</span> -->
            </button>
            &nbsp;&nbsp;
            <button class="btn btn-sm btn-outline-primary">
              <i class="ion-heart"></i>
              &nbsp; Favorite Post
              <span class="counter">({{ article.favoritesCount }})</span>
            </button>
          </template>
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body" />
      </div>

      <hr />

      <div class="article-actions">
        <div v-if="article.author" class="article-meta">
          <UserAvatar :info="{ ...article.author, date: article.updatedAt }" />

          <template v-if="article.author.username === auth.username">
            <button class="btn btn-sm btn-outline-primary" @click="editArticle">
              <i class="ion-edit"></i>
              &nbsp; Edit Article
            </button>
            &nbsp;&nbsp;
            <button
              class="btn btn-outline-danger btn-sm"
              @click="deleteArticle"
            >
              <i class="ion-trash-a"></i>
              &nbsp; Delete Article
            </button>
          </template>
          <template v-else>
            <button
              v-if="article.author && article.author.following"
              class="btn btn-sm btn-outline-primary"
            >
              <!-- <i class="ion-plus-round"></i> -->
              &nbsp; UnFollow {{ article.author.username }}
              <!-- <span class="counter">(10)</span> -->
            </button>
            <button v-else class="btn btn-sm btn-outline-secondary">
              <i class="ion-plus-round"></i>
              &nbsp; Follow {{ article.author && article.author.username }}
              <!-- <span class="counter">(10)</span> -->
            </button>
            &nbsp;&nbsp;
            <button class="btn btn-sm btn-outline-primary">
              <i class="ion-heart"></i>
              &nbsp; Favorite Post
              <span class="counter">({{ article.favoritesCount }})</span>
            </button>
          </template>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                v-model="comment.body"
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
              ></textarea>
            </div>
            <div class="card-footer">
              <nuxt-link
                :to="`/profile/${auth.username}`"
                class="comment-author"
              >
                <img :src="auth.image" class="comment-author-img" />
              </nuxt-link>
              <button class="btn btn-sm btn-primary" @click="submitCommit">
                Post Comment
              </button>
            </div>
          </form>

          <div v-for="cmt in comments" :key="cmt.id" class="card">
            <div class="card-block">
              <p>{{ cmt.body }}</p>
            </div>
            <div class="card-footer">
              <nuxt-link
                :to="`/profile/${cmt.author.username}`"
                class="comment-author"
              >
                <img :src="cmt.author.image" class="comment-author-img" />
              </nuxt-link>
              &nbsp;
              <nuxt-link
                :to="`/profile/${cmt.author.username}`"
                class="comment-author"
              >
                {{ cmt.author.username }}
              </nuxt-link>
              <span class="date-posted">{{ cmt.updatedAt }}</span>
              <span class="mod-options">
                <i
                  v-if="cmt.author.username === auth.username"
                  class="ion-trash-a"
                  @click="deleteComment(cmt)"
                ></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getArticle,
  addComment,
  listComments,
  deleteComment,
  deleteArticle,
} from '@/api/article'
import UserAvatar from '@/components/user-avatar'
import MarkdownIt from 'markdown-it'
export default {
  name: 'ArticleDetail',
  components: {
    UserAvatar,
  },
  data() {
    return {
      article: {},
      comment: {
        body: '',
      },
      comments: [],
    }
  },
  computed: {
    auth() {
      return this.$store.state.auth || {}
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.initArticle()
      this.initComment()
    },
    initArticle() {
      getArticle(this.$route.params.slug)
        .then((res) => {
          const { data } = res
          const md = new MarkdownIt()
          data.article.body = md.render(data.article.body)
          this.article = data.article || {}
        })
        .catch(() => {})
    },
    initComment() {
      listComments(this.$route.params.slug)
        .then((res) => {
          const { data } = res
          this.comments = data.comments || []
        })
        .catch(() => {})
    },
    deleteComment(comment) {
      deleteComment(this.$route.params.slug, comment.id)
        .then((res) => {
          this.initComment()
        })
        .catch(() => {})
    },
    submitCommit(e) {
      e.preventDefault()
      addComment(this.$route.params.slug, this.comment)
        .then((res) => {
          this.initComment()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    editArticle() {
      this.$router.replace({
        name: 'article-edit',
        params: { slug: this.article.slug },
      })
    },
    deleteArticle() {
      deleteArticle(this.$route.params.slug)
        .then((res) => {
          this.$router.replace('/')
        })
        .catch(() => {})
    },
  },
}
</script>
