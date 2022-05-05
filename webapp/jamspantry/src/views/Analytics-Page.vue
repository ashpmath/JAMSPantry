<template>
  <div>
    <v-container fluid>
      <v-card>
        <!-- <graph :data="datag" title="the chart title"></graph> -->
        <div class="scroll">
          <div id="app" style="width: 60%">
            <h2 style="padding-center: 50px">
              Pantry Temperature and Humidity
            </h2>
            <GChart
              type="AreaChart"
              :data="chartData"
              :options="chartOptions()"
            />
            <h4 style="center: 60px">
              Time Within The Past 6 hours
            </h4>
          </div>
          <div id="app" style="width: 60%">
            <h2 style="padding-center: 50px">Container Capacity</h2>
            <GChart
              :settings="{ packages: ['corechart', 'gauge'] }"
              type="Gauge"
              :data="weightData"
              :options="weightOption()"
            />
          </div>
          <div id="app" style="width: 50%">
            <h2 style="padding-center: 50px">Expiration Dates</h2>
            <GChart
              type="ColumnChart"
              :data="chartData"
              :options="chartOptions2()"
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
      chartOptions(){
        return{
          title: "Temperature and Humidity",
          xAxis: "By Hour",
          yAxis: "Values",
          titleY: "Humidity (Grams Per Cubic Meter) and Temperature (Degrees Celsius)",
          titleX: "Historic Time - Last 6 Hours",
          height: 500,
        }
      },
      chartOptions2() {
        return{
          title: "Expiration Dates",
          height: 500,
          titleX: "Products Expiring (Monthy Basis)",
          titleY: "Item Quantity"
        }
      },
      weightOption() {
        return{
        title: "Hello",
        width: 400,
        height: 120,
        redFrom: 0,
        redTo: 10,
        yellowFrom: 10,
        yellowTo: 25,
        minorTicks: 2,
        }
      },
    };
  },
  methods: {
    getData(snapshot) {
      // get temp and humidity data for area chart
      let temperatures = snapshot.Temperature;
      let humidities = snapshot.Humidity;
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
      this.weightData = [
        ["Label", "Value"],
        ["QTY %", parseFloat(snapshot.Weight)],
      ];
    },
    scrollHanle(evt) {
      console.log(evt);
    },
  },
  mounted() {
    onValue(ref(db, auth.currentUser.uid + "/Environment"), (snapshot) => {
      this.getData(snapshot.val());
    });
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