<template>
  <v-dialog
    v-model="show"
    max-width="500px"
  >
    <v-card>
      <v-toolbar
        flat
        dark
        :color="type"
      >
        <v-btn
          icon
          dark
          @click="onOk"
        >
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card-text class="headline font-weight-bold mt-3">
        <p class="font-italic mt-3">
          {{ message }}
        </p>        
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="onOk"
        >ตกลง</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Dialog",
  props: { title: String, message: String, type: String, show: Boolean },

  methods: {
    onOk(event) {
      console.log('OK')
      this.$emit("onOk", this.show);
    },
  },

  mounted() {
    this.show = false;
  },
};
</script>
