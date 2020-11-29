export const alert = {
  namespaced: true,

  state: {
    type: null,
    message: null
  },

  mutations: {
    SET_SUCCESS(state, message) {
      state.type = 'info'
      state.message = message
    },
    SET_ERROR(state, message) {
      state.type = 'error'
      state.message = message
    },
    SET_CLEAR(state) {
      state.type = null
      state.message = null
    }
  },

  actions: {
    success({ commit }, message) {
      commit('SET_SUCCESS', message)
    },
    error({ commit }, message) {
      commit('SET_ERROR', message)
    },
    clear({ commit }) {
      commit('SET_CLEAR')
    }
  },

  getters: {
    getMessage(state) {
      const payload = {
        type: state.type,
        message: state.message
      }
      return payload
    }
  }
}
