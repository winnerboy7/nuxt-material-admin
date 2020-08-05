<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="../static/images/logo-dark.png" alt="Vue Material Admin"  height="120">
                  <h1 class="flex my-4 primary--text">SITE - GATEWAY</h1>
                </div>
                <v-form v-model="valid">
                  <v-text-field
                    append-icon="person"
                    label="Login"
                    name="username"
                    v-validate="'required'"
                    data-vv-name="username"
                    :error-messages="errors.collect('username')"
                    v-model="form.username"
                    required
                  ></v-text-field>
                  <v-text-field 
                    append-icon="lock"
                    label="Password"
                    id="password" 
                    name="password" 
                    v-validate="'required'"
                    data-vv-name="password"
                    :error-messages="errors.collect('password')"                    
                    type="password"
                    v-model="form.password"
                    required
                  ></v-text-field>
                </v-form>
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
                </v-btn>
                <v-spacer></v-spacer> -->
                <v-btn block color="primary" @click="submit" :loading="loading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import { mapState, mapActions } from "vuex";

  export default {
    layout: 'default',
    $_veeValidate: {
      validator: 'new'
    },
    data: () => ({
      loading: false,
      form: {
        username: '',
        password: ''
      },
      valid: true,
    }),

    computed: {
      ...mapState("account", ["status"])
    },

    mounted () {
      this.$validator.localize('th', this.dictionary);
    },

    methods: {
      ...mapActions("account", ["login", "logout"]),
      ...mapActions("alert", ["success", "error", "clear"]),

      submit () {
        this.$validator.validateAll();
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
        this.formModel = {};
        this.$validator.reset();
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
