<template>
  <div>
    <v-card>
      <v-toolbar class = "pa-2">
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
                            <home></home>
                        </v-container>
                    </v-tab-item>
                    <v-tab-item>
                        <v-container>
                            <kiosk></kiosk>
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
        </template>
      </v-toolbar>
    </v-card>
  </div>
</template>

<script>
import { db, auth} from "../firebase";
import { ref, onValue, } from "firebase/database";
import Inventory from './Inventory-Page.vue'
import Kiosk from'./Kiosk-Page.vue'
import Analytics from './Analytics-Page.vue'
import Home from './Home-Page.vue'

export default {
  name: "App",
  components: {
    Inventory,
    Kiosk,
    Analytics,
    Home,
  },
  methods: {
  getTemperature(){
      return onValue(ref(db, auth.currentUser.uid + "/Environment/Temperature/0"), (snapshot) => {
        return snapshot.val();
    });
  },
  getHumidity(){
    return onValue(ref(db, auth.currentUser.uid + "/Environment/Humidity/0"), (snapshot) => {
        return snapshot.val();
    });
  },
  },
  data() {
    return {
      tab: null,
      items: ["Home", "Kiosk", "Inventory", "Analytics"],
      text: "Welcome to JAMSPantry home page! Here you will find everything you need to know about your pantrys inventory to product information, expiration dates, and analytics.",
      
      created() {
      const firebase = firebase.firebase();
      },
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ["Environment", "Firebase Value"],
        ["Temperature", this.getTemperature()],         // this.getTemperature()
        ["Humidity", this.getHumidity()],             //this.getHumidity()
      ],
      chartOptions: {
        chart: {
          title: "Temperature Vs. Humidity",       
          xAxis: "Values",
          yAxis: "Environment Variables",
          legend: 'on'
        }
        
      }
    };
  }, //end of data method
  mounted() { // outside async func
    console.log(this.getTemperature());
    console.log(this.getHumidity());
    this.getTemperature();
    this.getHumidity();
  }
};
</script>