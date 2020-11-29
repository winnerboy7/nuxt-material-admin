import { AuthenService } from '@/controllers'
// import { router } from '@/router'

const user = JSON.parse(localStorage.getItem('user'))
const state = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null }

const mutations = {
  LOGIN_REQUEST(state, user) {
    state.status = { loggingIn: true }
    state.user = user
  },
  LOGIN_SUCCESS(state, user) {
    state.status = { loggedIn: true }
    state.user = user
  },
  LOGIN_FAILURE(state) {
    state.status = {}
    state.user = null
  },
  LOGOUT(state) {
    state.status = {}
    state.user = null
  },
}

const actions = {
  login({ dispatch, commit }, { username, password }) {
    commit('LOGIN_REQUEST', { username })
   
    this.$auth.loginWith('local', {
      data: {
        username: username,
        password: password,
      },
    }).then(
      (user) => {
        // console.log(user.data)
        if (user.data.token) {
          localStorage.setItem('user', JSON.stringify(user.data))
          commit('LOGIN_SUCCESS', user.data)
          dispatch('alert/success', 'ยินดีต้อนรับ : ' + username, {
            root: true
          })
        } else {
          commit('LOGIN_FAILURE', 'เกิดข้อผิดพลาด !')
          dispatch('alert/error', 'เกิดข้อผิดพลาด !', {
            root: true
          })
        }
      },
      (error) => {
        // console.log(error.response.data)
        commit('LOGIN_FAILURE', error.response.data.message)
        dispatch('alert/error', error.response.data.message, { root: true })
      }
    )
  },

  auth({ dispatch, commit }, { username, password }) {
    commit('LOGIN_REQUEST', { username })
    AuthenService.login(username, password).then(
      (user) => {
        if (user.data.token) {
          localStorage.setItem('user', JSON.stringify(user.data))
          commit('LOGIN_SUCCESS', user.data)
          dispatch('alert/success', 'ยินดีต้อนรับ : ' + username, {
            root: true
          })
        } else {
          commit('LOGIN_FAILURE', 'เกิดข้อผิดพลาด !')
          dispatch('alert/error', 'เกิดข้อผิดพลาด !', {
            root: true
          })
        }
      },
      (error) => {
        commit('LOGIN_FAILURE', error)
        dispatch('alert/error', error, { root: true })
      }
    )
  },

  logout({ commit }) {
    AuthenService.logout()
    commit('LOGOUT')
  },
}

export const account = {
  namespaced: true,
  state,
  actions,
  mutations
}
