import API from './base.js'

export default {
  /**
   * 加载 ajax 的简洁语法配置。
   */
  load() {
    // 公布 ajax api 的底层功能，以便框架使用者能进行定制开发。
    window._api = API
    // 加载根目录下 ajax api 的用户配置。
    const ajaxModules = require.context('../../ajax/', true, /\.js$/);
    ajaxModules.keys().forEach(key => {
      let oneAjaxModule = ajaxModules(key)
      oneAjaxModule = oneAjaxModule['default'] || oneAjaxModule
      let allAjaxActions = Object.assign({},
        API._fromAjaxConfig(oneAjaxModule['get']),
        API._fromAjaxConfig(oneAjaxModule['post'], 'post')
      )
      const fileName = key.replace(/(\.\/)|(\.js)/g, '')
      if (!_api[fileName]) {
        _api[fileName] = allAjaxActions
      } else {
        throw new Error({
          error: 'ajax 配置的文件名命名冲突！请不要用 get|post|axios 作为文件名。',
          code: 10001
        })
      }
    })
  }
}
