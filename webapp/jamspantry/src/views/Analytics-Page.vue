<template>
  <div>
    <v-container fluid>
      <v-card>
        <!-- <graph :data="datag" title="the chart title"></graph> -->
        <div class="scroll">
          <div id="app" style="width: 60%">
            <GChart
              type="AreaChart"
              :data="chartData"
              :options="chartOptions()"
            />
          </div>
          <div id="app" style="width: 60%">
            <h2 style="padding-center: 50px">Container Capacity</h2>
            <GChart
              :settings="{ packages: ['corechart', 'gauge'] }"
              type="Gauge"
              :data="weightData"
              :options="weightOptions()"
            />
          </div>
          <div id="app" style="width: 50%">
            <GChart
              type="ColumnChart"
              :data="chartData"
              :options="chartOptions2()"
              xAxis="Monthly Timeline"
              yAxis="Product Quantity"
            />
          </div>
          <div id="app" style="width: 50%">
            <h2 style="padding-center: 50px">Total Count (# of items)</h2>
            <GChart
              type="PieChart"
              :data="chartData"
              :options="chartOptions3()"
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
          title: "Pantry Temperature and Humidity",
          xAxis: "By Hour",
          yAxis: "Values",
          titleY: "Humidity (Grams Per Cubic Meter) and Temperature (Degrees Celsius)",
          titleX: "Historic Time - Last 6 Hours",
          height: 500,
          titleTextStyle: {
            color: '333333',
            fontName: 'Arial',
            fontSize: 30,
          },
          titleYTextStyle: {
            color: '333333',
            fontName: 'Arial',
            fontSize: 30,
          },
          titleXTextStyle: {
            color: '333333',
            fontName: 'Arial',
            fontSize: 30,
          },
        }
      },
      chartOptions2() {
        return{
          title: "Product Expiration Dates",
          titleX: "Monthly Timeline for Product Expiration",
          titleY: "Item Quantity",
          height: 500,
          titleTextStyle: {
            color: '333333',
            fontName: 'Arial',
            fontSize: 30,
          },
          titleYTextStyle: {
            color: '333333',
            fontName: 'Arial',
            fontSize: 30,
          },
          titleXTextStyle: {
            color: '333333',
            fontName: 'Arial',
            fontSize: 30,
          },
        }
      },
      weightOptions() {
        return{
          title: "Relative Mass of Container (%)",
          width: 400,
          height: 120,
          redFrom: 0,
          redTo: 10,
          yellowFrom: 10,
          yellowTo: 25,
          minorTicks: 2,
          titleTextStyle: {
            color: '333333',
            fontName: 'Arial',
            fontSize: 30,
          },
        }
      },
      chartOptions3() {
        return{
          title: "Total Items in Pantry",
          titleX: "Quantity",
          height: 500,
          titleTextStyle: {
            color: '333333',
            fontName: 'Arial',
            fontSize: 30,
          },
        }
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
      // // Total Items in Pantry
      // let weight = parseFloat(snapshot.Weight);
      // if (weight != -1) {
      //   this.Data = [["Label", "Value"], ["QTY %", weight]];
      // }
      // else {
      //   this.object.keys.length = 
      // }

    },
  },
  mounted() {
    onValue(ref(db, auth.currentUser.uid + "/Environment"), (snapshot) => {
      this.getEnvironmentData(snapshot.val());
    });
  },
};
</script>