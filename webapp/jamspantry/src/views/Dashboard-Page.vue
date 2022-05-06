<template>
  <v-card style="max-width: 1300px; margin: auto">
    <v-toolbar mt-3>
      <template>
        <v-tabs v-model="tabs" centered icons-and-text>
          <v-tab>Home<v-icon>mdi-home</v-icon></v-tab>
          <v-tab>Inventory<v-icon>mdi-format-list-bulleted</v-icon></v-tab>
          <v-tab>Analytics<v-icon>mdi-poll</v-icon></v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <v-container>
          <home></home>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-container>
          <inventory></inventory>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-container>
          <analytics></analytics>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import Inventory from "./Inventory-Page.vue";
import Analytics from "./Analytics-Page.vue";
import Home from "./Home-Page.vue";

export default {
  name: "App",
  components: {
    Inventory,
    Analytics,
    Home,
  },
  data() {
    return {
      tabs: null,
      created() {},
      // Array will be automatically processed with visualization.arrayToDataTable function
    };
  }, //end of data method
};
</script>

<style>
.v-tab--active {
  color: #e00736 !important;
}
</style>