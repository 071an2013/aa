const MobileDetect = require('mobile-detect')
const getCurrentRenderer = function () {
  let md = new MobileDetect(window.navigator.userAgent);
  if (md.tablet()) {
    return 'pad'
  } else {
    if (md.mobile()) {
      return 'mobile'
    }
  }
  return 'pc'
}
const siteRenderer = getCurrentRenderer()

// initial state
const state = {
  isMenuCollapsed: siteRenderer != 'pc',
  siteRenderer: siteRenderer,
  isShowIFrame: false,
  allIFrames: [],
  currentIFrame: null,
  // 当前用户信息.
  currentUser: {
    id: '',
    name: ''
  },
  mainMenuConfig: []
}

let taskPtr = null
window.addEventListener('resize', function () {
  if (taskPtr) {
    window.clearTimeout(taskPtr)
  }
  taskPtr = window.setTimeout(function () {
    state.siteRenderer = getCurrentRenderer()
  }, 50)
}, false)

// getters
import getters from './getters.js'
import actions from './actions.js'
import mutations from './mutations.js'

export default {
  state,
  getters,
  actions,
  mutations
}
