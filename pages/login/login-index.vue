<template>
  <v-app id="login" class="primary">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="@/static/images/logo-dark.png" alt="เข้าสู่ระบบ"  height="120">
                  <h1 class="flex my-4 primary--text">SITE - GATEWAY</h1>
                </div>

                <v-alert v-if="alert.message" :type="alert.type" border="left" :value="true">
                  {{ alert.message }}
                </v-alert>

                <v-form
                  ref="form"
                  v-model="valid"
                  :lazy-validation="lazy"
                  @keyup.native.enter="valid && handleSubmit($event)"
                >
                  <v-text-field
                    v-model="username"
                    :counter="10"
                    :rules="usernameRules"
                    label="Username"
                    name="username"
                    prepend-icon="mdi-account"
                    type="text"
                    required
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    v-model="password"
                    :counter="6"
                    :rules="passwordRules"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  type="submit"
                  :disabled="!valid"
                  color="primary"
                  class="mr-4"
                  @click="handleSubmit"
                >
                  เข้าสู่ระบบ
                </v-btn>

                <v-btn color="warning" @click="resetValidation">
                  รีเซต
                </v-btn>
              </v-card-actions>
            </v-card>

            <v-dialog v-model="dialog" hide-overlay persistent width="300">
              <v-card color="primary" dark>
                <v-card-text>
                  กำลังเข้าสู่ระบบ ...
                  <v-progress-linear
                    indeterminate
                    color="white"
                    class="mb-0"
                  ></v-progress-linear>
                </v-card-text>
              </v-card>
            </v-dialog>

            <!-- <v-dialog v-model="dialog" width="500">
              <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                  Privacy Policy
                </v-card-title>

                <v-card-text>
                  ยินดีต้อนรับเข้าสู่ระบบ
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="dialog = false">
                    I accept
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog> -->
          </v-flex>
        </v-layout>
      </v-container>
      <snack-bar :snackbar-message.sync="snackbarMessage"></snack-bar>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Role } from '@/controllers/role'
import SnackBar from '@/components/snackBar'

export default {
  layout: 'login',

  data: () => ({
    valid: true,
    lazy: false,
    username: '',
    usernameRules: [
      (v) => !!v || 'กรุณากรอก Username',
      (v) => (v && v.length >= 4) || 'Username อย่างน้อย 4 ตัวอักษร',
    ],
    password: '',
    passwordRules: [
      (v) => !!v || 'กรุณากรอก Password',
      (v) => (v && v.length >= 4) || 'Password อย่างน้อย 4 ตัวอักษร',
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'กรุณากรอก E-mail',
      (v) => /.+@.+\..+/.test(v) || 'E-mail ไม่ถูกต้อง',
    ],
    dialog: false,
    snackbarMessage: '',
  }),

  computed: {
    ...mapState({
      account: (state) => state.account,
      user: (state) => state.account.user,
      status: (state) => state.account.status,
      roleAuth: (state) => state.account.user.role,
      alert: (state) => state.alert,
      vuetify: state => state.vuetify,
    })
  },

  watch: {
    status() {
      if (this.status.loggedIn) {
        this.dialog = true
      }
    },
    dialog(val) {
      if (!val) { return }
      const _this = this

      let url = '/'
      if (this.roleAuth === Role.Admin) {
        url = '/admin'
      } else if (this.roleAuth === Role.Area) {
        url = '/area'
      }

      setTimeout(function() {
        _this.dialog = false
        _this.$router.push(url)
      }, 500)
    },
  },

  mounted() {
    this.clear()
    this.logout()
  },

  methods: {
    ...mapActions('account', ['login', 'logout']),
    ...mapActions('alert', ['success', 'error', 'clear']),

    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.reset()
      this.$refs.form.resetValidation()
    },

    handleSubmit() {
      const { username, password } = this
      if (username && password) {
        this.login({ username, password })
      }
    },

    async handleSubmit_auth() {
      try {
        // const { username, password } = this
        const response = await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password,
          },
        })
        console.log(response.data)
        this.snackbarMessage = `ยินดีต้อนรับคุณ ${response.data.user.name}`
      } catch (error) {
        console.log(error.response.data.message)
        this.snackbar = true
        this.snackbarMessage = error.response.data.message
      }
    },
    
  },
}
</script>

<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
