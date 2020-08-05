export const alert = {
  namespaced: true,
  
  state: {
    type: null,
    message: null
  },

  mutations: {
    SET_SUCCESS(state, message) {
      state.type = "alert-success";
      state.message = message;
    },
    SET_ERROR(state, message) {
      state.type = "alert-danger";
      state.message = message;
    },
    SET_CLEAR(state) {
      state.type = null;
      state.message = null;
    }
  },

  actions: {
    success({ commit }, message) {
      commit("SET_SUCCESS", message);
    },
    error({ commit }, message) {
      commit("SET_ERROR", message);
    },
    clear({ commit }) {
      commit("SET_CLEAR");
    }
  }
};
