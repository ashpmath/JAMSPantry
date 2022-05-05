<template>
  <div>
    <v-container fluid>
      <v-card>
        <div class="scroll">
          <spacer></spacer>
        <div id="app" style="width: 60%">
          <h2 style="padding-center: 50px">Pantry Temperature and Humidity</h2>
          <GChart
            type="AreaChart"
            :data="chartData"
            :options="chartOptions"
            xAxis="Time"
            yAxis="Environment Variables"
          />
        </div>
        <spacer></spacer>
        <div id="app" style="width: 60%">
          <h2 style="padding-center: 50px">Pantry Temperature and Humidity</h2>
          <GChart
            :settings="{ packages: ['corechart', 'gauge'] }"
            type="Gauge"
            :data="weightData"
            :options="weightOptions"
          />
        </div>
        <spacer></spacer>
        <div id="app" style="width: 50%">
          <h2 style="padding-center: 50px">Expiration Dates</h2>
          <GChart
            type="ColumnChart"
            :data="chartData"
            :options="chartOptions"
            xAxis="Monthly Timeline"
            yAxis="Product Quantity"
          />
        </div>
        <spacer></spacer>
        <div id="app" style="width: 50%">
          <h2 style="padding-center: 50px">Total Pantry Capacity</h2>
          <GChart
            type="PieChart"
            :data="chartData"
            :options="chartOptions"
            xAxis="Monthly Timeline"
            yAxis="Product Quantity"
          />
        </div>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
import { db, auth } from "../firebase";
import { ref, query, get, orderByChild } from "firebase/database";

//google.load('visualization', '1', {packages:['intensitymap']});
//google.setOnLoadCallback(drawChart);
//google.charts.setOnLoadCallback(initialize);
//Vue.use(VueScrollbar);

export default {
  name: "App",
  components: {
    GChart, 
  },
  data() {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: null,
      weight: null,
      weightData: [
        ["Label", "Value"],
        ["QTY %", 0],
      ],
      chartOptions: {
        chart: {
          title: "Temperature and Humidity",
          subtitle: "By Hour",
          colors: ['#1b9e77', '#d95f02', '#7570b3']
        },
      },
      weightOptions: {
        width: 400,
        height: 120,
        redFrom: 0,
        redTo: 10,
        yellowFrom: 10,
        yellowTo: 25,
        minorTicks: 2,
        colors: ['#1b9e77', '#d95f02', '#7570b3'],
      },
    };
  },
  methods: {
    getData() {
      get(
        query(
          ref(db, auth.currentUser.uid + "/Environment"),
          orderByChild("Temperature")
          )
      ).then((snapshot) => {
        // get temp and humidity data for area chart
        let temperatures = snapshot.val().Temperature;
        let humidities = snapshot.val().Humidity;
        let len = temperatures.length;
        this.chartData = [["Time", "Temperature", "Humidity"]];
        for (let i = 0; i < len; i++) {
          this.chartData.push([
            len - i,
            //google.visualization.DataView(parseFloat(temperatures[i])),
            //google.visualization.DataView(parseFloat(humidities[i])),
            parseFloat(temperatures[i]),
            parseFloat(humidities[i]),
          ]);
        }
        // get weight for the guage ***in prog
        this.weight = snapshot.val().Weight;

        // get expiration dates for column chart in prog
        this.expirationDate = snapshot.val().Expiration;
      });
    },
    scrollHanle(evt) {
      console.log(evt)
    }
  },
  mounted() {
    this.getData();
  },
};
</script>

 <style>
      div.scroll {
        background-color: #ffffff00;
        width: 1737px;
        height: 650px;
        overflow-x: scroll;
        overflow-y: scroll;
        text-align: left;
        padding: 20px;
      }
    </style>