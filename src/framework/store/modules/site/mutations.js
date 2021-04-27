const mutations = {
  setMenuCollapsedState(state, isMenuCollapsed) {
    state.isMenuCollapsed = isMenuCollapsed
  },
  setIsShowIFrame(state, isShowIFrame) {
    state.isShowIFrame = isShowIFrame
  },
  pushIFrameUrl(state, url) {
    if (url) {
      if (state.allIFrames.indexOf(url) < 0) {
        state.allIFrames.push(url)
      }
      state.currentIFrame = url
    }
  },
  updateCurrentUser(state, userInfo) {
    state.currentUser = userInfo
  },
  /**
   * 在指定位置添加菜单。
   */
  insertMenu(state, [menuItems, menuPosition]) {
    if (menuItems.constructor !== Array) {
      menuItems = [menuItems]
    }
    if (typeof menuPosition == 'undefined' || menuPosition === '') {
      state.mainMenuConfig.push(...menuItems)
    } else {
      let positionParts = String(menuPosition).split('.')
      if (positionParts.length === 1) {
        state.mainMenuConfig.splice(positionParts[0], 0, ...menuItems)
      } else {
        let rootMenu = state.mainMenuConfig[positionParts[0]]
        if (!rootMenu['children']) {
          rootMenu['children'] = []
        }
        rootMenu['children'].splice(positionParts[1], 0, ...menuItems)
      }
    }
  }
}

export default mutations