import Axios from 'axios'

export const service = Axios.create({
  baseURL: 'https://conduit.productionready.io/api',
})

export default ({ store, router, route }) => {
  // request拦截器
  service.interceptors.request.use(
    (config) => {
      // 设置 token
      const { auth } = store.state
      if (auth && auth.token) {
        config.headers.Authorization = 'Token ' + auth.token
      }
      return config
    },
    (error) => {
      Promise.reject(error)
    }
  )

  service.interceptors.response.use(
    (res) => {
      return Promise.resolve(res)
    },
    (error) => {
      const { response } = error
      if (response.status === 401) {
        store.commit('setAuth', {})
      }

      return Promise.reject(error)
    }
  )
}
