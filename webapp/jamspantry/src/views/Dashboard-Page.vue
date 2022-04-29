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
      Analytics

      <table class="table" id="dataTable">
        <thead>
          <th>Product</th>
          <th>Quantity</th>
          <th>Expiration Date</th>
        </thead>
        <tbody>
          <tr>
            <td>Rice</td>
            <td>1</td>
            <td>06/26/2022</td>
          </tr>
          <tr>
            <td>Cereal</td>
            <td>3</td>
            <td>07/2/2023</td>
          </tr>
          <tr>
            <td>Chicken Noodle Soup</td>
            <td>4</td>
            <td>02/23/2023</td>
          </tr>
          <tr>
            <td>Gold Fish</td>
            <td>2</td>
            <td>06/12/2022</td>
          </tr>
        </tbody>
      </table>

      <div class="chart">
        <canvas id="myChart"></canvas>
      </div>

      <div>
        <h3>ANALYTICS</h3>
        <bar-chart></bar-chart>
      </div>
      <div id="app">
    <h1 style="padding-center:90px;">Expiration Dates</h1>
    <GChart type="BarChart" :data="chartData" :options="chartOptions"/>    
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
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ["Product", "Dates"],
        ["Copper", 8.49],
        ["Silver", 10.49],
        ["Gold", 19.30],
        ["Platinum", 21.45],
      ],
      chartOptions: {
        chart: {
          title: "Expiration Dates",          
        }
      }
    };
  }
};
</script>