<template>
  <v-app dark>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer height="auto" class="white pa-3 app--footer">
      <span class="caption">&copy; Copy right : {{ new Date().getFullYear() }} All rights reserved.</span>
      <v-spacer></v-spacer>
      <span class="caption mr-1"> API Version : {{version}}</span>
      <v-icon color="pink" small>account_balance</v-icon>
    </v-footer>
  </v-app>
</template>

<script>
import npmPackage from "@/package.json"
export default {
  data () {
    return {
      version: npmPackage.version
    }
  }
}
</script>
