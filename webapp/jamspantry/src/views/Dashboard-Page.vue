<template>
  <div>
    <v-card>
      <v-toolbar class = "pa-2">
          <v-tabs v-model="tabs" centered>
                <v-tab>Home</v-tab>
                <v-tab>Inventory</v-tab>
                <v-tab>Analytics</v-tab>
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
            </v-tabs>
      </v-toolbar>
    </v-card>
  </div>
</template>

<script>
import Inventory from './Inventory-Page.vue'
import Analytics from './Analytics-Page.vue'
import Home from './Home-Page.vue'

export default {
  name: "App",
  components: {
    Inventory,
    Analytics,
    Home,
  },
  data() {
    return {  
      created() {
      },
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