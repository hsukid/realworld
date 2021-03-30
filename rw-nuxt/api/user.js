import { service as req } from '@/plugins/request'

/**
 * 登录
 * @param {*} form
 * @returns
 */
export function login(form) {
  return req.post('/users/login', form)
}
/**
 * 注册
 * @param {*} form
 * @returns
 */
export function register(form) {
  return req.post('/users', form)
}
/**
 * 更新
 * @param {*} data
 * @returns
 */
export function updateUser(data) {
  return req.put('/user', data)
}
/**
 * 获取用户信息
 * @param {*} form
 * @returns
 */
export function getUser(username) {
  return req.get(`/profiles/${username}`)
}
/**
 * 关注用户
 * @param {*} username
 * @returns
 */
export function addFollow(username) {
  return req.post(`/profiles/${username}/follow`)
}
/**
 * 取消关注用户
 * @param {*} username
 * @returns
 */
export function deleteFollow(username) {
  return req.delete(`/profiles/${username}/follow`)
}
