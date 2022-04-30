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
      <v-spacer></v-spacer>

      <div>
        <h1>Smart Pantry Environment</h1>
        <bar-chart></bar-chart>
      </div>
      <div id="app">
    <h2 style="padding-center:90px;">Temperature VS. Humidity</h2>
    <GChart type="ColumnChart" :data="chartData" :options="chartOptions"/>    
  </div>
    </v-container>
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
export default {
  name: "App",
  components: {
    GChart
  },
  data() {
    return {
      tab: null,
      items: ["Home", "Kiosk", "Inventory", "Analytics"],
      text: "Welcome to JAMSPantry home page! Here you will find everything you need to know about your pantrys inventory to product information, expiration dates, and analytics.",
      
      created() {
      const firebase = firebase.firebase();
      },
      // getTemperature(){
      // firebase.database().ref('/Environment/temperature').once('value').then(function(snapshot) {
      //     temperature = snapshot.val();
      // }
      // },

      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ["Environment", "Firebase Value"],
        ["Temperature", 24.07], //getTemperature()
        ["Humidity", 24.78],
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
  }
};
</script>