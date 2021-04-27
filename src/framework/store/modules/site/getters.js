const getters = {
  isMenuCollapsed: state => state.isMenuCollapsed,
  siteRenderer: state => state.siteRenderer,
  isShowIFrame: state => state.isShowIFrame,
  allIFrames: state => state.allIFrames,
  currentIFrame: state => state.currentIFrame,
  currentUser: stage => stage.currentUser,
  mainMenuConfig: stage => stage.mainMenuConfig
}

export default getters