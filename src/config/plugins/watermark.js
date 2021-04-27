import store from '@/store'

export default {
  /**
   * 是否使用水印。
   */
  isShowWatermark: true,
  /**
   * 获取水印所需要的当前用户信息。
   * 用户信息若获取成功，则会被同步保存到 vuex，应用其它地方需要时，直接从 vuex 全局状态中获取即可。
   * 若用户未启用水印，则需要通过其它方式，获取当前用户信息，以便更新标题栏的用户名。
   *
   * 用户信息的结构必须是：
   * {
   *    "id": userID,
   *    "name": "userName"
   * }
   * 生成的水印的字符串的格式为：'name-id'。
   * @returns {Promise}
   */
  getWatermarkInfo() {
    const {
      state: {
        userInfo: { name, id }
      }
    } = store

    return Promise.resolve({
      name,
      id
    })
  }
}
