<template>
  <div>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="pgoods"
        :items-per-page="5"
        item-key="name"
        class="elevation-1"
        :footer-props="{
          showFirstLastPage: true,
          firstIcon: 'mdi-arrow-collapse-left',
          lastIcon: 'mdi-arrow-collapse-right',
          prevIcon: 'mdi-minus',
          nextIcon: 'mdi-plus',
        }"
        :search="search"
        :custom-filter="filterOnlyCapsText"
      >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import { auth, db } from "../firebase";
import { ref, query, get, orderByChild } from "firebase/database";

export default {
  data() {
    return {
      search:'',
      headers: [
        {
          text: "Pantry Good",
          align: "start",
          value: "description",
        },
        { text: "Expiration Date", value: "expir" },
      ],
      pgoods: [],
    };
  },
  
  methods: {
    getFullInventory() {
      get(
        query(
          ref(db, auth.currentUser.uid + "/inventory"),
          orderByChild("description")
        )
      ).then((snapshot) => {
        if (snapshot.exists()) {
          for (const item in snapshot.val()) {
            this.pgoods.push({
              description: snapshot.val()[item].description,
              expir: snapshot.val()[item].expiration,
            });
          }
        } else {
          this.pgoods = [];
        }
      });
    },
    filterOnlyCapsText (value, search) {
        search = search.toLocaleUpperCase()
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
      },
    },

  mounted() {
    this.getFullInventory();
  },
};
</script>
