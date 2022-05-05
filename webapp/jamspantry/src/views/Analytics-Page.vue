<template>
  <div>
    <v-container fluid>
      <v-card>
        <div class="scroll">
          <div id="app" style="width: 60%">
            <h2 style="padding-center: 50px">
              Pantry Temperature and Humidity
            </h2>
            <GChart
              type="AreaChart"
              :data="chartData"
              :options="chartOptions"
              xAxis="Time"
              yAxis="Environment Variables"
            />
          </div>
          <div id="app" style="width: 60%">
            <h2 style="padding-center: 50px">Container Capacity</h2>
            <GChart
              :settings="{ packages: ['corechart', 'gauge'] }"
              type="Gauge"
              :data="weightData"
              :options="weightOptions"
            />
          </div>
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
import { ref, onValue } from "firebase/database";

export default {
  name: "App",
  components: {
    GChart,
  },
  data() {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: null,
      weightData: null,
      chartOptions: {
        chart: {
          title: "Temperature and Humidity",
          subtitle: "By Hour",
        },
      },
      weightOptions: {
        redFrom: 0,
        redTo: 10,
        minorTicks: 5,
        redColor: "#941B35",
      },
    };
  },
  methods: {
    getEnvironmentData(snapshot) {
      // get temp and humidity data for area chart
      let temperatures = snapshot.Temperature;
      let humidities = snapshot.Humidity;
      let len = temperatures.length;
      this.chartData = [["Time", "Temperature", "Humidity"]];
      for (let i = 0; i < len; i++) {
        this.chartData.push([
          (len - i)/60,
          parseFloat(temperatures[i]),
          parseFloat(humidities[i]),
        ]);
      }
      // get weight for the guage ***in prog
      let weight = parseFloat(snapshot.Weight);
      if (weight != -1) {
        this.weightData = [["Label", "Value"], ["QTY %", weight]];
      }
      else {
        this.weightData = [["Label", "Value"], ["QTY %", weight]];
      }
    },
  },
  mounted() {
    onValue(ref(db, auth.currentUser.uid + "/Environment"), (snapshot) => {
      this.getEnvironmentData(snapshot.val());
    });
  },
};
</script>