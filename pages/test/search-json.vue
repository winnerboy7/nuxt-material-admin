<template>
  <div>
    <v-container class="grey lighten-5 mb-6">
      <v-row>
        <v-col>
          <v-text-field label="input id" v-model="id"> </v-text-field>
          <v-text-field label="input name" v-model="name"> </v-text-field>
        </v-col>

        <v-col>
          <v-btn @click="add()">ADD User</v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          search:
        </v-col>

        <v-col>
          <v-text-field label="Search" v-model="search"> </v-text-field>
        </v-col>
      </v-row>
      <v-row v-for="(e, key) in listFilter" :key="key">
        <v-col> {{ e.id }} {{ e.name }} </v-col>

        <v-col>
          <v-btn @click="del(key)">x</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <div v-for="(e, key) in listFilter" :key="key">
      {{ e.id }} {{ e.name }} <v-btn @click="del(key)">x</v-btn>
    </div>
    <pre>{{ listFilter }}</pre>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      list: [
        {
          id: "1001",
          name: "Chaimongkol  Khamkom"
        },
        {
          id: "1002",
          name: "Apinan Kinnaree"
        }
      ],
      search: "",
      name: ""
    };
  },
  computed: {
    listFilter() {
      let text = this.search.trim();
      return this.list.filter(item => {
        return item.name.indexOf(text) > -1;
      });
    }
  },
  methods: {
    add() {
      this.list.push({ id: this.id, name: this.name });
    },
    del(id) {
      console.log(id);
      this.list.splice(id, 1);
    }
  }
};
</script>

<style></style>
