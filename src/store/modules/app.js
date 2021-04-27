// initial state
const state = {
  userInfo: {}
}

// getters
const getters = {}

// actions
const actions = {
  getUserInfo({ commit }) {
    return window._api.site.getUserInfo().then(data => {
      commit('setUserInfo', data.data)
      return data
    })
  }
}

// mutations
const mutations = {
  setUserInfo(state, userData) {
    state.userInfo = userData
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
