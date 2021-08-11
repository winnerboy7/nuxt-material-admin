<template>
  <div>
    <v-select
      label="Names"
      v-model="name"
      v-on:change="xName"
      :items="names"
      item-value="id"
      item-text="name"
      return-object
    >
      <template slot="selection" slot-scope="{ item }">
        {{ item.name }} - {{ item.age }}
      </template>
      <template slot="item" slot-scope="{ item }">
        {{ item.name }} - {{ item.age }}
      </template>
    </v-select>
    <pre> {{ addDisplayname }} </pre>
    <pre> xxx: {{ namesFiltered }} </pre>
  </div>
</template>

<script>
export default {
  data: () => ({
    name,
    names: [
      { id: 1, name: "Paul", description: " Olarn", age: 23 },
      { id: 2, name: "Marcelo", description: " Olove", age: 15 },
      { id: 3, name: "Any", description: " Oleve", age: 30 }
    ],
    namesFiltered: ""
  }),

  computed: {
    addDisplayname() {
      return this.names.map(v => ({
        ...v,
        displayname: v.name + " - " + v.description
      }));
    }
  },

  methods: {
    xName(value) {
      // this.namesFiltered = this.names.filter(e => {
      //   return e.id.match(value) > -1;
      // });
    }
  }
};
</script>
