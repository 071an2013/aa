const LOGIN_OUTDATE_CODE = 100403

export default {
  /**
   * ajax 接口地址前缀，一般地留空即可。
   * 如果 ajax 接口地址太长，且有一致的前缀，则可以通过 serverBasePath 简化 ajax 配置中的接口长度。
   */
  serverBasePath: '',
  /**
   * ajax 响应数据全局性处理函数。
   * @response {Options}
   * 		config: http请求参数
   * 		headers: 响应头数据
   * 		data:	响应内容(JSON)
   * 		status: 状态码
   *
   * 一般地，ajax接口返回的数据格式需要遵循一定的规范，如：
   * 调用成功时返回
   * {
   * 		code: 1,
   * 		data: {}
   * }
   * 调用失败时返回
   * {
   *   	code: 0,
   * 		error: ’no perm'
   * }
   *
   * 此处的 ajaxResponseFilter 配置，可以用于全局地，对响应内容做一些预处理操作.
   */
  ajaxResponseFilter: ({ data, status }) => {
    const { error } = data
    let errorFlag = false
    if ((error && error.code === LOGIN_OUTDATE_CODE) || status === 401) {
      const location = window.location || document.location
      if (location.href.indexOf('site/afterLogin') !== -1) {
        return
      }
      const { hostname } = location
      if (hostname.indexOf('dev') > -1) {
        location.href =
          'http://sso.test.yunshanmeicai.com/user/login?system_key=gateway-center'
      } else if (hostname.indexOf('test2') > -1) {
        location.href =
          'http://sso-test2.qc.yunshanmeicai.com/user/login?system_key=gateway-center'
      } else if (hostname.indexOf('stable') > -1) {
        location.href =
          'https://sso.stage.yunshanmeicai.com/user/login?system_key=gateway-center'
      } else if (hostname.indexOf('stage') > -1) {
        location.href =
          'https://sso.stage.yunshanmeicai.com/user/login?system_key=gateway-center'
      } else if (hostname.indexOf('test') > -1) {
        location.href =
          'https://sso.test.yunshanmeicai.com/user/login?system_key=gateway-center'
      } else if (hostname.indexOf('qc') > -1) {
        location.href =
          'https://sso.qc.yunshanmeicai.com/user/login?system_key=gateway-center'
      } else {
        location.href =
          'https://sso.yunshanmeicai.com/user/login?system_key=gateway-center'
      }

      errorFlag = true
    }

    return errorFlag ? Promise.reject(error) : data
  },

  ajaxResErrorHandler(err) {
    if (err === -100 || err.response.status === 401) {
      const location = window.location || document.location
      if (location.href.indexOf('site/afterLogin') !== -1) {
        return
      }
      const { hostname } = location
      if (hostname.indexOf('dev') > -1) {
        location.href =
          'http://sso-test2.qc.yunshanmeicai.com/user/login?system_key=gateway-center'
      } else if (hostname.indexOf('test2') > -1) {
        location.href =
          'http://sso-test2.qc.yunshanmeicai.com/user/login?system_key=gateway-center'
      } else if (hostname.indexOf('stable') > -1) {
        location.href =
          'https://sso.stage.yunshanmeicai.com/user/login?system_key=gateway-center'
      } else if (hostname.indexOf('stage') > -1) {
        location.href =
          'https://sso.stage.yunshanmeicai.com/user/login?system_key=gateway-center'
      } else if (hostname.indexOf('test') > -1) {
        location.href =
          'https://sso.test.yunshanmeicai.com/user/login?system_key=gateway-center'
      } else if (hostname.indexOf('qc') > -1) {
        location.href =
          'https://sso.qc.yunshanmeicai.com/user/login?system_key=gateway-center'
      } else {
        location.href =
          'https://sso.yunshanmeicai.com/user/login?system_key=gateway-center'
      }
    }

    return Promise.reject(err)
  }
}
