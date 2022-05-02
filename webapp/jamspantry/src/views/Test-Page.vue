<template>
  <div>
    <v-card>
      <v-toolbar color="gray" dark flat>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Your Dashboard</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-text-field
            append-icon="mdi-microphone"
            class="mx-4"
            flat
            hide-details
            label="Search"
            prepend-inner-icon="mdi-magnify"
            solo-inverted
        ></v-text-field>

        <template v-slot:extension>
            <v-tabs v-model="tabs" centered>
                <v-tab>Home</v-tab>
                <v-tab>Kiosk</v-tab>
                <v-tab>Inventory</v-tab>
                <v-tab>Analytics</v-tab>
            
                    <v-tab-item>
                        <v-container>
                            <v-container fluid>
                        Notifications & Alerts
                        <v-spacer></v-spacer>

                        <v-alert
                            color="red"
                            dense
                            dismissible
                            elevation="20"
                            outlined
                            prominent
                            text-color="black"
                            text
                            type="error"
                        >
                            Food Expires Soon!
                        </v-alert>
                        <v-alert
                            dense
                            dismissible
                            elevation="20"
                            outlined
                            prominent
                            text
                            type="success"
                        >
                            The product <strong>rice</strong> was<strong>
                            successfully added </strong
                            >to pantry.
                        </v-alert>
                        
                        </v-container>
                        </v-container>
                    </v-tab-item>
                    <v-tab-item>
                        <v-container>
                            Kiosk
                        </v-container>
                    </v-tab-item>
                    <v-tab-item>
                        <v-container>
                            <inventory></inventory>
                        </v-container>
                    </v-tab-item>
                    <v-tab-item>
                        <v-container>
                            Analytics
                        </v-container>
                    </v-tab-item>
            </v-tabs>
        </template>
      </v-toolbar>
    </v-card>
    
      
  </div>
</template>

<script>
import Inventory from './Inventory-Page.vue'
export default {
    components: {
        Inventory,
    },
  data() {
    return {
      tab: null,
      items: ["Home", "Kiosk", "Inventory", "Analytics"],
      text: "Welcome to JAMSPantry home page! Here you will find everything you need to know about your pantrys inventory to product information, expiration dates, and analytics.",
    };
  },
};
</script>
