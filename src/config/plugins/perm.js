export default {
	/**
	 * 菜单权限过滤方案。
	 */
  permScheme: {
    /**
     * 获取当前用户的权限码列表。
     * 权限码列表的格式为一个一维字符串数组，如：
     * ['/perm/code/1', '/perm/code/2']
     */
    getAllMyPerms() {
      /**
       * 方案1：
       * 假设服务端直接打印到页面一个全局页面 _allMyPerms。
       */
      window._allMyPerms = ['/perm/code/1', '/perm/code/2']
      return new Promise(function (resolve, reject) {
        resolve(window._allMyPerms)
      })
      /**
       * 方案2：
       * 假设 getUserPerm 接口返回的数据格式为：
       * {
       * 	  "code": 1,
       * 	  "data": [
       * 		  "/perm/code/2"
       * 	  ]
       * }
       */
      return _api.site.getUserPerm().then((response) => {
        const allMyPerms = response.data || []
        return allMyPerms
      })
    }
  }
}
