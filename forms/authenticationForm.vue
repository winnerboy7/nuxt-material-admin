

<template>
  <v-form
    ref="form"
    v-model="form.valid"
    lazy-validation
  >
    <v-text-field
      v-model="form.username"
      :rules="usernameRules"
      label="Username"
      required
    ></v-text-field>

    <v-text-field
      v-model="form.password"
      :counter="20"
      :rules="passwordRules"
      :type="'password'"
      label="Password"
      required
    ></v-text-field>
    <v-btn
      :disabled="!form.valid"
      color="indigo lighten-1"
      class="mr-4"
      @click="validate"
    >
      {{ buttonTitle }}
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'authenticationForm',
  
  props: {
    form: {
      required: true,
    },
    buttonTitle: {
      required: true,
    },
  },

  data: () => ({
    usernameRules: [
      (v) => !!v || 'กรุณากรอก Username',
      (v) => (v && v.length >= 4) || 'Username อย่างน้อย 4 ตัวอักษร',
    ],
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) =>
        (v && v.length <= 20) || 'Password must be less than 20 characters',
    ],
  }),
  mounted() {
    this.form.valid = false
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.form.finish = true
        this.$emit('update:form', this.form)
      }
    },
  },
}
</script>