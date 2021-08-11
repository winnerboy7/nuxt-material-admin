<template>
  <v-container class="text-center">    
    <v-row
      :align="'center'"
      :justify="'center'"
      class="mt-12"
    >
      <v-col
        cols="12"
        md="6"
        lg="3"
      >
        <h1>Login</h1>
        <authentication-form
          button-title="Logging"
          :form.sync="form"
        ></authentication-form>
      </v-col>
    </v-row>
    <snack-bar :snackbar-message.sync="snackbarMessage"></snack-bar>
  </v-container>
</template>

<script>
import AuthenticationForm from '@/forms/authenticationForm'
import SnackBar from '@/components/snackBar'

export default {
  layout: 'login',
  components: { AuthenticationForm, SnackBar },
  data: () => ({
    form: {
      valid: false,
      username: '',
      password: '',
      finish: false,
    },
    snackbarMessage: '',
  }),
  computed: {
    finish() {
      return this.form.finish
    },
  },
  watch: {
    finish(newVal) {
      if (newVal) {
        this.login()
        this.form.finish = false
      }
    },
  },
  methods: {
    async login() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: {
            username: this.form.username,
            password: this.form.password,
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