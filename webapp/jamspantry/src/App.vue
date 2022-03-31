<template>
  <v-app id="inspire">
    <v-app-bar app class="secondary" flat>
      <v-container class="py-0 fill-height">
        <v-avatar size="54px">
          <img src="./assets/JAMSLogo.png" />
        </v-avatar>

        <v-btn v-for="link in links" :key="link" text>
          {{ link }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-autocomplete
            class="primary"
            prepend-inner-icon="mdi-magnify"
            placeholder="Search Inventory"
            :items=searchItems
            flat
            hide-details
            dense
            solo
            rounded
            auto-select-first
          ></v-autocomplete>
        </v-responsive>
        <v-btn icon @click="toggleTheme"
          ><v-icon>mdi-brightness-4</v-icon></v-btn
        >
      </v-container>
    </v-app-bar>

    <v-main class="primary">
      <v-container>
        
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    links: ["Dashboard", "Inventory"],
    searchItems: ["Apple", "Banana", "Cereal", "Rice"], /// need to query db for this list
  }),
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>