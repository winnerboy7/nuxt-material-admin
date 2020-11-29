import { alert } from "./modules/alert"
import { account } from "./modules/account"
import { config } from "./modules/setting"
import { vuetify } from './modules/vuetify'

export const state = () => ({
  drawer: true
})

export const modules = {
  alert,
  account,
  config,
  vuetify
};

export const mutations = {
  toggleDrawer(state) {
    state.drawer = !state.drawer
  },
  drawer(state, val) {
    state.drawer = val
  }
}

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  }
}