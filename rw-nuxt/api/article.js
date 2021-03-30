import { service as req } from '@/plugins/request'

/**
 * 获取文章列表
 * @param {*} params
 * @returns
 */
export function listArticles(params) {
  return req.get('/articles', { params })
}
/**
 * 获取关注文章列表
 * @param {*} params
 * @returns
 */
export function listFeed(params) {
  return req.get('/articles/feed', { params })
}
/**
 * 获取文章
 * @param {*} slug
 * @returns
 */
export function getArticle(slug) {
  return req.get(`/articles/${slug}`)
}
/**
 * 创建文章
 * @param {*} data
 * @returns
 */
export function createArticle(data) {
  return req.post(`/articles`, { article: data })
}
/**
 * 更新文章
 * @param {*} data
 * @returns
 */
export function updateArticle(slug, data) {
  return req.put(`/articles/${slug}`, { article: data })
}
/**
 * 删除文章
 * @param {*} data
 * @returns
 */
 export function deleteArticle(slug) {
  return req.delete(`/articles/${slug}`)
}
/**
 * 添加评论
 * @param {*} slug comment
 * @returns
 */
export function addComment(slug, comment) {
  return req.post(`/articles/${slug}/comments`, { comment })
}
/**
 * 获取评论列表
 * @param {*} slug comment
 * @returns
 */
export function listComments(slug) {
  return req.get(`/articles/${slug}/comments`)
}
/**
 * 删除评论
 * @param {*} slug comment
 * @returns
 */
export function deleteComment(slug, commentId) {
  return req.delete(`/articles/${slug}/comments/${commentId}`)
}
/**
 * 喜欢文章
 * @param {*} slug comment
 * @returns
 */
export function addFavorite(slug) {
  return req.post(`/articles/${slug}/favorite`)
}
/**
 * 取消喜欢文章
 * @param {*} slug comment
 * @returns
 */
export function deleteFavorite(slug) {
  return req.delete(`/articles/${slug}/favorite`)
}
/**
 * 获取tags列表
 * @returns
 */
export function listTags() {
  return req.get(`/tags`)
}
