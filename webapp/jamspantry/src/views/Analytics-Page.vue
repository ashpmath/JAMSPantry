<template>
  <div>
    <v-container fluid>
      <v-card>
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
        <div id="app" style="width: 60%">
          <h2 style="padding-center: 50px">Pantry Temperature and Humidity</h2>
          <GChart
            :settings="{ packages: ['corechart', 'gauge'] }"
            type="Gauge"
            :data="weightData"
            :options="weightOptions"
          />
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
import { db, auth } from "../firebase";
import { ref, query, get, orderByChild } from "firebase/database";

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
            parseFloat(temperatures[i]),
            parseFloat(humidities[i]),
          ]);
        }

        // get weight for the guage ***in prog
        this.weight = snapshot.val().Weight;
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>