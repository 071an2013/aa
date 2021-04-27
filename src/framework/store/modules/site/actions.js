const actions = {
  setMenuCollapsedState({ commit }, isMenuCollapsed) {
    commit('setMenuCollapsedState', isMenuCollapsed)
  },
  setIsShowIFrame({ commit }, isShowIFrame) {
    commit('setIsShowIFrame', isShowIFrame)
  },
  pushIFrameUrl({ commit }, url) {
    commit('pushIFrameUrl', url)
  },
  updateCurrentUser({ commit }, userInfo) {
    commit('updateCurrentUser', userInfo)
  },
  appendMenu({ commit }, menuItems) {
    commit('insertMenu', [menuItems])
  },
  prependMenu({ commit }, menuItems) {
    commit('insertMenu', [menuItems, 0])
  },
  /**
   * 在指定的位置添加菜单。
   * @param {*} menuItems : Array | Object
   * @param {*} menuPosition : String
   * 如： 
   * "2" : 为在索引为 2 的位置插入主菜单。
   * "2.1" 为在索引为 2 的主菜单的第 1 的索引位置添加子菜单。
   * 菜单插件仅支持两级。
   */
  insertMenu({ commit }, [menuItems, menuPosition]) {
    commit('insertMenu', [menuItems, menuPosition])
  }
}

export default actions