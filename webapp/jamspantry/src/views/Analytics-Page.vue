<template>
  <div>
      <v-container>
        <!-- Container QTY and pantry count -->
        <v-row>
          <v-col align="center">
            <h2>Container Capacity</h2>
            <GChart
              :style="graphStyle"
              :settings="{ packages: ['corechart', 'gauge'] }"
              type="Gauge"
              :data="weightData"
              :options="weightOptions()"
            />
          </v-col>
          <v-col align="center">
            <h2 style="padding-center: 50px">Total Items</h2>
            <h1 style="font-size: 80px">{{totalItem}}</h1>
          </v-col>
        </v-row>
        <!-- Temp/Humidity -->
        <v-row  :style="graphStyle">
          <div style="width: 100%">
            <GChart
              type="AreaChart"
              :data="chartData"
              :options="tempHumOptions()"
            />
          </div>
        </v-row>
        <!-- Expiration Dates -->
        <v-row class="pa-1" :style="graphStyle">
          <div style="width: 100%">
            <GChart
              type="ColumnChart"
              :data="expirData"
              :options="expirOptions()"
              xAxis="Monthly Timeline"
              yAxis="Product Quantity"
            />
          </div>
        </v-row>
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
      expirData: null,
      totalItem: null,
      tempHumOptions() {
        return {
          title: "Pantry Temperature and Humidity",
          xAxis: "By Hour",
          yAxis: "Values",
          height: 300,
          titleY:
            "Humidity (%) and Temperature (Degrees Celsius)",
          titleX: "Historic Time - Last 6 Hours",
          titleTextStyle: {
            color: "333333",
            fontName: "Arial",
            fontSize: 30,
          },
          titleYTextStyle: {
            color: "333333",
            fontName: "Arial",
            fontSize: 30,
          },
          titleXTextStyle: {
            color: "333333",
            fontName: "Arial",
            fontSize: 30,
          },
        };
      },
      expirOptions() {
        return {
          title: "Product Expiration Dates",
          titleX: "Monthly Timeline for Product Expiration",
          titleY: "Item Quantity",
          height: 200,
          titleTextStyle: {
            color: "333333",
            fontName: "Arial",
            fontSize: 30,
          },
          titleYTextStyle: {
            color: "333333",
            fontName: "Arial",
            fontSize: 30,
          },
          titleXTextStyle: {
            color: "333333",
            fontName: "Arial",
            fontSize: 30,
          },
        };
      },
      weightOptions() {
        return {
          title: "Relative Mass of Container (%)",
          redFrom: 0,
          redTo: 10,
          redColor: "941B35",
          minorTicks: 5,
        };
      },
    };
  },
  computed: {
    graphStyle() {
      if (this.$vuetify.theme.dark) {
        return {
          filter: "invert(88%) brightness(98%)",
        };
      }
      return "";
    },
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
          (len - i) / 60,
          parseFloat(temperatures[i]),
          parseFloat(humidities[i]),
        ]);
      }
      // get weight for the guage ***in prog
      let weight = parseFloat(snapshot.Weight);
      if (weight != -1) {
        this.weightData = [
          ["Label", "Value"],
          ["QTY %", weight],
        ];
      } else {
        this.weightData = [
          ["Label", "Value"],
          ["QTY %", weight],
        ];
      }
    },
    getExpirData(snapshot) {
      this.expirData = [
        ["Time Frame", "Count"],
        ["Expired", 0],
        ["1-2", 0],
        ["3-6", 0],
        ["6+", 0],
      ];
      this.totalItem = 0;
      for (var itemKey in snapshot) {
        let itemDate = new Date(snapshot[itemKey].expiration);
        this.totalItem = this.totalItem + 1;
        // expired
        let curDate = new Date();
        if (itemDate < curDate) {
          this.expirData[1][1] = this.expirData[1][1] + 1;
        } else {
          // 1-2
          curDate.setMonth(curDate.getMonth() + 2);
          if (itemDate < curDate) {
            this.expirData[2][1] = this.expirData[2][1] + 1;
          } else {
            // 3-6
            curDate.setMonth(curDate.getMonth() + 6);
            if (itemDate < curDate) {
              this.expirData[3][1] = this.expirData[3][1] + 1;
            } else {
              // 6+
              this.expirData[4][1] = this.expirData[4][1] + 1;
            }
          }
        }
      }
    },
  },
  mounted() {
    onValue(ref(db, auth.currentUser.uid + "/Environment"), (snapshot) => {
      this.getEnvironmentData(snapshot.val());
    });
    onValue(ref(db, auth.currentUser.uid + "/inventory"), (snapshot) => {
      this.getExpirData(snapshot.val());
    });
  },
};
</script>