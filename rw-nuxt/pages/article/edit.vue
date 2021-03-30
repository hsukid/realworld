<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="form.title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="form.description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="form.body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="form.tags"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="submit"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle, createArticle, updateArticle } from '@/api/article'
export default {
  name: 'Editor',
  middleware: 'authenticated',
  data() {
    return {
      form: {
        title: '',
        description: '',
        body: '',
        tags: '',
      },
      loading: false,
    }
  },
  computed: {
    isEdit() {
      return this.$route.name === 'article-edit'
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.isEdit) {
        const slug = this.$route.params.slug
        getArticle(slug)
          .then((res) => {
            const { article } = res.data
            const tags = article.tagList ? article.tagList.join(',') : ''
            this.form = { ...article, tags }
          })
          .catch(() => {})
      }
    },
    async submit() {
      try {
        const { title, description, body, tags } = this.form
        const tagList = tags.split(',')
        const data = { title, description, body, tagList }
        let res = null
        this.loading = true
        if (this.isEdit) {
          res = await updateArticle(this.form.slug, data)
        } else {
          res = await createArticle(data)
        }
        this.$router.replace(`/article/${res.data.article.slug}`)
      } catch (err) {
        this.loading = false
      }
    },
  },
}
</script>
