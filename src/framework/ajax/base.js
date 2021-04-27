import axios from 'axios'
import siteOptions from '@/config/index'

/**
 * 全局的 ajax 路径前缀。
 */
const serverBasePath = siteOptions['serverBasePath'] || '';

/**
 * 全局自定义 http 请求头。
 */
const $http = axios.create({
  responseType: 'json',
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
})

/**
 * 全局性 http 响应拦截.
 */
$http.interceptors.response.use(
  siteOptions['ajaxResponseFilter'] || (response => response.data)
)


export default {
  axios,
  $http,
  /**
   * 自定义 $http。
   * 若框架提供的默认 $http 实例不能满足项目需求，可使用此方法创建新的请求对象，替换默认的 $http。
   * @param {Object} options 
   */
  customize$http(options) {
    return new Promise((resolve, reject) => {
      const $newHttp = this.axios.create(options)
      this.$http = $newHttp
      resolve($newHttp)
    })
  },
  /**
   * http get method.
   * @param {String} url 
   * @param {Options} params 
   * @returns {Promise}
   */
  get(url, params) {
    return this.$http.get(url, {
      params: params
    })
  },
  /**
   * http post method.
   * @param {String} url 
   * @param {Options} params 
   * @returns {Promise}
   */
  post(url, params) {
    return this.$http.post(url, params)
  },
  /**
   * 根据 ajax 的简洁语法配置，生成 ajax 方法。
   * @param {Options} ajaxConfig 
   * @param {String} httpMethod : default get
   */
  _fromAjaxConfig(ajaxConfig, httpMethod) {
    const ajaxActions = {}
    Object.keys(ajaxConfig || {}).forEach(apiName => {
      ajaxActions[apiName] = params => {
        let api = ajaxConfig[apiName]
        if (!/^http/.test(api)) {
          api = serverBasePath + api;
        }
        return this[httpMethod || 'get'](api, params)
      }
    })
    return ajaxActions
  }
}
