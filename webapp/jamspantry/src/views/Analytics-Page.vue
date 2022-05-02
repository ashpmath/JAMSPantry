<template>
  <div>
    <v-card>
      <v-toolbar color="gray" dark flat>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>Your Dashboard</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
        <template v-slot:extension>
          <v-tabs v-model="tab" align-with-title>
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab v-for="item in items" :key="item">
              {{ item }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item">
          <v-card flat>
            <v-card-text v-text="text"></v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <v-container fluid>
      <v-spacer></v-spacer>
      <div>
        <h1>Analytics</h1>
        <bar-chart></bar-chart>
      </div>
      <div id="app">
    <h2 style="padding-center:90px;">Expiration Dates</h2>
    <GChart type="LineChart" :data="chartData" :options="chartOptions"/>    
  </div>
    </v-container>
  </div>
</template>

<script>
//import { getDatabase } from '@firebase/database';
import { db, auth} from "../firebase";
import { ref, onValue, } from "firebase/database";
import { GChart } from "vue-google-charts";

export default {
  name: "App",
  components: {
    GChart
  },
  methods: {
    getTemperature(){
    onValue(ref(db, "/" + auth.currentUser.uid + "/Environment/temperature"), (snapshot) => {
        console.log(snapshot.val);
    });
    },
    // getHumidity(){

    // },
  },
  data() {
    return {
      tab: null,
      items: ["Home", "Kiosk", "Inventory", "Analytics"],
      
      created() {
      const firebase = firebase.firebase();
      },
  
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ["Product", "Expiration Date"],
        ["Temperature", 10], //getProductDate()
        ["Humidity", 20],
      ],
      chartOptions: {
        chart: {
          title: "Expiration Dates",       
          xAxis: "Item",
          yAxis: "Date Product Expires",
          legend: 'on'
        }
        
      }
    };
  } // end of data
  mounted(){
    
  }
};
</script>