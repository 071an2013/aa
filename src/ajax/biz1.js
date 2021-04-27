/**
 * ajax 业务模块配置示例。
 */
export default {
  get: {
    getUserInfo: "/user/get",
    getSsuDetail: '/biz1/get-ssu-detail'
  },
  post: {
    getUserPerm: "/user/perm",
    addCart: '/biz1/add-cart'
  }
}

/**
 * ajax 配置规范：
 * 1. 所有的 ajax api 路径，在此文件夹下配置。
 * 2. 根据实际项目的业务模块拆分情况，将 ajax api，放在各自的文件内，分组维护。
 * 3. 这里提供了两个示例模块 - site 与 biz1。
 * 4. 添加新的模块，只需要在 ajax 文件夹下添加如 biz1.js 格式的文件就可以，不需要做其它改动。
 *
 *
 * 调用示例：
 * _api.site.getUserInfo({
 *   // params...
 * }).then(result=>{
 *   // 回调
 * })
 * _api.biz1.addCart({
 *   // params...
 * }).then(result=>{
 *   // 回调
 * })
 * 其中：_api 为全局变量，直接使用，不需要显式引入。
 *
 *
 * 个性化调用：
 * _api.axios : axios 包引用
 * _api.$http : ajax 请求实例（单体）
 * _api.get(url, params)  : Promise
 * _api.post(url, params) : Promise
 * _api.customize$http(options) : 自定义 ajax 请求实例
 * 详情参考：/framework/ajax/base.js
 */