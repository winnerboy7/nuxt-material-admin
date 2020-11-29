<template>
  <v-app id="login" class="primary">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            
            <v-card class="elevation-1 pa-3">                
              <ValidationObserver ref="observer" v-slot="{ handleSubmit, reset, valid }">
                <v-form ref="form" @keyup.native.enter="handleSubmit(onSubmit)" @reset.prevent="reset">
                  <v-card-text>
                    <div class="layout column align-center">
                      <img src="@/static/images/logo-dark.png" alt="Vue Material Admin"  height="120">
                      <h1 class="flex my-4 primary--text">SITE - GATEWAY</h1>
                    </div>

                    <v-alert v-if="alert.message" :type="alert.type" border="left" :value="true">
                      {{ alert.message }}
                    </v-alert>
                    
                    <ValidationProvider
                      name="ชื่อผู้ใช้งาน"
                      v-slot="{ errors }"
                      rules="required|max:20"
                    >
                      <v-text-field
                        append-icon="person"
                        v-model="form.username"
                        :counter="20"
                        :error-messages="errors"
                        label="ชื่อผู้ใช้งาน"
                      ></v-text-field>
                    </ValidationProvider>

                    <ValidationProvider
                      name="รหัสผ่าน"
                      v-slot="{ errors }"
                      rules="required|max:20|min:4"
                    >
                      <v-text-field
                        append-icon="lock"
                        v-model="form.password"
                        :counter="20"
                        :error-messages="errors"
                        label="รหัสผ่าน"
                        type="password"
                      ></v-text-field>
                    </ValidationProvider>
                  
                  </v-card-text>
                  <v-card-actions>
                    <!-- <v-btn icon>
                      <v-icon color="blue">fa fa-facebook-square fa-lg</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon color="red">fa fa-google fa-lg</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon color="light-blue">fa fa-twitter fa-lg</v-icon>
                    </v-btn> -->
                    <v-spacer></v-spacer>
                    <v-btn block color="primary" @click="handleSubmit(onSubmit)" :loading="loading" :disabled="!valid" >เข้าสู่ระบบ</v-btn>
                  </v-card-actions>
                </v-form>
              </ValidationObserver>
            </v-card>
          </v-flex>
        </v-layout>
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
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Role } from '@/controllers/role'
import SnackBar from '@/components/snackBar'

import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from "vee-validate";
import th from "vee-validate/dist/locale/th.json";
import * as rules from "vee-validate/dist/rules";

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },

  data: () => ({
    loading: false,
    form: {
      username: '',
      password: ''
    },
    valid: true,
    dialog: false,
    snackbarMessage: '',
  }),

  async created() {
    // Install VeeValidate rules and localization
    Object.keys(rules).forEach(rule => {
      extend(rule, rules[rule]);
    });
    localize("th", th);
  },

  computed: {
    ...mapState({
      account: (state) => state.account,
      user: (state) => state.account.user,
      status: (state) => state.account.status,
      roleAuth: (state) => state.account.user.role,
      alert: (state) => state.alert,
      vuetify: state => state.vuetify,
    }),
  },

  mounted () {
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

  methods: {
    ...mapActions("account", ["login", "logout"]),
    ...mapActions("alert", ["success", "error", "clear"]),

    onSubmit () {
      this.loading = true;
      const { username, password } = this.form;
      if (username && password) {
        this.login({ username, password })
      }
      this.loading = false;
      // setTimeout(() => {
      //   this.$router.push('/dashboard');
      // }, 1000);
    },
    clear () {
      this.form = {
        username: '',
        password: ''
      }
    }
  },

  beforeDestroy (){
    this.clear();
  }
};
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
