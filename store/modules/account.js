import { authen } from "@/_services/authen";

const user = JSON.parse(localStorage.getItem("user"));
const state = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null };

const mutations = {
  LOGIN_REQUEST(state, user) {
    state.status = { loggingIn: true };
    state.user = user;
  },
  LOGIN_SUCCESS(state, user) {
    state.status = { loggedIn: true };
    state.user = user;
  },
  LOGIN_FAILURE(state) {
    state.status = {};
    state.user = null;
  },
  LOGOUT(state) {
    state.status = {};
    state.user = null;
  },
  REGISTER_REQUEST(state, user) {
    state.status = { registering: true };
  },
  REGISTER_SUCCESS(state, user) {
    state.status = {};
  },
  REGISTER_FAILURE(state, error) {
    state.status = {};
  }
};

const actions = {
  login({ dispatch, commit }, { username, password }) {
    commit("LOGIN_REQUEST", { username });

    authen.login(username, password).then(
      user => {
        commit("LOGIN_SUCCESS", user);
        dispatch("alert/success", "ยินดีต้อนรับ : " + username, { root: true });
        this.$router.push("/");
      },
      error => {
        commit("LOGIN_FAILURE", error);
        dispatch("alert/error", error, { root: true });
      }
    );
  },

  logout({ commit }) {
    authen.logout();
    commit("LOGOUT");
  },
  
  register({ dispatch, commit }, user) {
    commit("REGISTER_REQUEST", user);

    authen.register(user).then(
      user => {
        commit("REGISTER_SUCCESS", user);
        this.$router.push("/#/login");
        setTimeout(() => {
          // display success message after route change completes
          dispatch("alert/success", "Registration successful", { root: true });
        });
      },
      error => {
        commit("REGISTER_FAILURE", error);
        dispatch("alert/error", error, { root: true });
      }
    );
  }
};

export const account = {
  namespaced: true,
  state,
  actions,
  mutations
};
