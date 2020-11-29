const state = {
  primaryDrawer: {
    color: 'primary',
    colorLogo: 'blue darken-3',
    model: null,
    type: 'default (no property)',
    clipped: false,
    // clipped: this.$vuetify.breakpoint.lgAndUp,
    floating: false,
    mini: false,
  },

  footer: {
    inset: false,
    fixed: false,
    app: false,
    color: 'primary lighten-1',
    colorDev: 'primary lighten-2',
  },
}

const actions = {
}

const mutations = {
  SET_COLOR(state, payload) {
    state.primaryDrawer.color = payload
  },
  SET_COLOR_LOGO(state, payload) {
    state.primaryDrawer.colorLogo = payload
  },
  SET_MODEL(state, payload) {
    state.primaryDrawer.model = payload
  },
  SET_TYPE(state, payload) {
    state.primaryDrawer.type = payload
  },
  SET_CLIPPED(state, payload) {
    state.primaryDrawer.clipped = payload
  },
  SET_FLOATING(state, payload) {
    state.primaryDrawer.floating = payload
  },
  SET_MINI(state, payload) {
    state.primaryDrawer.mini = payload
  },
  SET_FOOTER_INSET(state, payload) {
    state.footer.inset = payload
  },
  SET_FOOTER_FIXED(state, payload) {
    state.footer.fixed = payload
  },
  SET_FOOTER_APP(state, payload) {
    state.footer.app = payload
  },
  SET_COLOR_FOOTER(state, payload) {
    state.footer.color = payload
  },
  SET_COLOR_FOOTERDEV(state, payload) {
    state.footer.colorDev = payload
  },
}

export const vuetify = {
  namespaced: true,
  state,
  actions,
  mutations,
}
