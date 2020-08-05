import { alert } from "./modules/alert";
import { account } from "./modules/account";
import { config } from "./modules/setting";

export const state = () => ({
  drawer: true
})

export const modules = {
  alert,
  account,
  config
};

export const mutations = {
  toggleDrawer(state) {
    state.drawer = !state.drawer
  },
  drawer(state, val) {
    state.drawer = val
  }
}
