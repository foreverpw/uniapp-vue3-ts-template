import Request, { type HttpResponse } from 'luch-request'

const http = new Request({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

// const setToken = (tk)=>{
//   token = tk
// }

let token = ''
http.interceptors.request.use(async (config) => { /* cancel 为函数，如果调用会取消本次请求。需要注意：调用cancel,本次请求的catch仍会执行。必须return config */
  let { custom } = config
  //loading
  if (custom && custom.showLoading) {
    uni.showLoading({ title: '加载中', mask: true })
  }

  //token
  config.header = {
    ...config.header,
  }
  // if (config.custom.auth) {
  //   config.header.token = 'token'
  // }
  /**
  if (!token) { // 如果token不存在，调用cancel 会取消本次请求，不会进入响应拦截器，但是该函数的catch() 仍会执行
    cancel('token 不存在', config) //  把修改后的config传入，之后响应就可以拿到修改后的config。 如果调用了cancel但是不传修改后的config，则catch((err) => {}) err.config 为request拦截器修改之前的config
  }
  **/
  return config
})

http.interceptors.response.use((response) => { /* 对响应成功做点什么 （statusCode === 200），必须return response*/
  let { custom } = response.config
  if (custom && custom.showLoading) {
    uni.hideLoading()
  }
  return response
}, (response) => { /*  对响应错误做点什么 （statusCode !== 200），必须return response*/
  //401 等
  let { custom } = response.config
  if (custom && custom.showLoading) {
    uni.hideLoading()
  }
  if (!response.data) {
    return response
  }
  if (response.data.code === 401) {
  } else {
    uni.showToast({ title: '系统错误', icon: 'none' })
  }
  return response
})


const isSuccess = (resp: HttpResponse<BaseResp>) => {
  let success = resp.data.code === 0
  if (!success) {
    if (resp.data.message) {
      uni.showToast({ title: resp.data.message, icon: 'none' })
    }
  }
  return success
}

const loadList = async (limit: number, list: any[], payload: any, requestHandler: (data: any, showLoading: boolean) => Promise<HttpResponse<BaseResp>>, refresh: boolean, showLoading = false) => {
  let start = list && list.length ? list.length : 0
  if (refresh === true) {
    start = 0
    list = []
  }
  let querys = { start, limit, ...payload }
  let resp = await requestHandler(querys, showLoading)
  if (isSuccess(resp)) {
    let total = 0
    let noMore = false
    if (resp.data.data.list) {
      list = list.concat(resp.data.data.list)
      total = resp.data.data.total
      noMore = resp.data.data.list.length < limit
    } else {
      list = list.concat(resp.data.data)
      noMore = resp.data.data.length < limit
    }
    let loadMoreStatus = noMore ? list.length ? 'noMore' : '' : 'more'
    return { list, noMore, loadMoreStatus, total }
  }
  return { list, noMore: false, loadMoreStatus: 'more' }

}

export { http, isSuccess, loadList }