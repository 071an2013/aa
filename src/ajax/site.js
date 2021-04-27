/**
 * ajax 全局性接口配置示例。
 */
export default {
  get: {

    // 获取用户登录信息
    getUserInfo: "/center/current"
  },
  post: {
    getUserPerm: "/user/perm"
  }
}