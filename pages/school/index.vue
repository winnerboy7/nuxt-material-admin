<template>
  <v-container grid-list-xl fluid>
    <h4>
      <i class="fa fa-smile-o"></i>
      Hi there, this an School page.</h4>
  </v-container>
</template>

<script>
  export default {
    layout: "app",
    middleware: "authorize-school",

  }
</script>

<style scoped>

</style>
