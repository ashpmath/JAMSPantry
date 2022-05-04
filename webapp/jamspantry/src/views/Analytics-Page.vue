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
          <h2 style="padding-center: 50px">Expiration Dates</h2>
          <GChart
            type="ColumnChart"
            :data="chartData2"
            :options2="chartOptions"
          />
        </div>

        <div id="app" style="width: 60%">
          <h2 style="padding-center: 50px">Container Capacity</h2>
          <GChart
            type="PieChart"
            :data="data3"
            :options="chartOptions3"
          />
        </div>

      </v-card>
    </v-container>
  </div>
</template>

 <script>
// //import { getDatabase } from '@firebase/database';
// import { db, auth} from "../firebase";
// import { ref, onValue, } from "firebase/database";
// import { GChart } from "vue-google-charts";

// export default {
//   name: "App",
//   components: {
//     GChart
//   },
//   methods: {
//     getTemperature(){
//       get(ref(db, "/" + auth.currentUser.uid + "/Environment/temperature"), (snapshot) => {
//         console.log(snapshot.val());
//          return snapshot.val();
//     });
//     },
//     getHumidity(){
//       get(ref(db, "/" + auth.currentUser.uid + "/Environment/humidity"), (snapshot) => {
//         console.log(snapshot.val());
//          return snapshot.val();
//     });
//     },
//   },
//   data() {
//     return {
//       tab: null,
//       items: ["Home", "Kiosk", "Inventory", "Analytics"],

//       created() {
//       const firebase = firebase.firebase();
//       },

//       // Array will be automatically processed with visualization.arrayToDataTable function
//       chartData: [
//         ["Product", "Expiration Date"],
//         ["Temperature", this.getTemperature()], //getProductDate()
//         ["Humidity", this.getHumidity()],
//       ],
//       chartOptions: {
//         chart: {
//           title: "Expiration Dates",
//           xAxis: "Item",
//           yAxis: "Date Product Expires",
//           legend: 'on'
//         }
//       }
//     };
//   }, // end of data
//   mounted(){
//     this.getTemperature();
//     this.getHumidity();
//   },
// };
//
</script>

<script>
import { GChart } from "vue-google-charts";
import { db, auth} from "../firebase";
import { ref, onValue, query, } from "firebase/database";

export default {
  name: "App",
  components: {
    GChart
  },
  methods: {
    getTemperature(){
      // onValue(ref(db, "/" + auth.currentUser.uid + "/Environment/temperature"), (snapshot) => {
      //   console.log(snapshot.val);
        get(
        query(ref(db, auth.currentUser.uid + "/Environment/temperature"),
          orderByChild("temperature")
        )
      ).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          for (const item in snapshot.val()) {
            this.pgoods.push({
              temperature: snapshot.val()[item].temperature,
              expir: snapshot.val()[item].temperature,
            });
          }
        } else {
          this.pgoods = [];
        }
        return float(snapshot.val());
      });
    },
    getHumidity(){
      // onValue(ref(db, "/" + auth.currentUser.uid + "/Environment/temperature"), (snapshot) => {
      //   console.log(snapshot.val);
        get(
        query(ref(db, auth.currentUser.uid + "/Environment/humidity"),
          orderByChild("humidity")
        )
      ).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          for (const item in snapshot.val()) {
            this.pgoods.push({
              humidity: snapshot.val()[item].humidity,
              expir: snapshot.val()[item].humidity,
            });
          }
        } else {
          this.pgoods = [];
        }
        return float(snapshot.val());
      });
    },
  },
  data() {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ["Time", "Temperature", "Humidity", { role: 'style' }], //this.getTemperature()
        ["1", 40, 50, '#662200'], //this.temperature()
        ["2", 30, 70, '#006644'],  // this.humidity() 
      ],
      chartOptions: {
        chart: {
          title: "Temperature and Humidity",
          subtitle: "By Hour"
        }
      },
    };
  },
  data2() {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData2: [
        ["Expiration Dates", "Products", { role: 'style' }],
        ["0-1", 8,'#006644'], //this.getTemperature()
        ["1-3", 3, '#006644'], 
        ["3-5", 4, '#006644'],    
        ["6+", 10, '#006644'],    
      ],
      chartOptions2: {
        chart2:{
          title2: "Expiration Dates",
          subtitle2: "Monthly Perspective"
        }
      }
    };
  },
  data3() {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData3: [
        ["Status", "Percentage", "NULL",{ role: 'style' } ],
        ["Filled", 60, 0, '#b82606'], 
        ["Empty", 40, 0, '#3b2606'],   
      ],
      chartOptions3: {
        chart3:{
          title3: "Container Capacity",
          subtitle3: "Relative Mass Percentage"
        }
      }
    };
  },
  mounted(){
    this.getTemperature();
    this.getHumidity();
  },
};
</script>

// getHumidity(){
//       onValue(ref(db, auth.currentUser.uid + "/Environment/humidity"), (snapshot) => {
//         console.log(snapshot.val);
//     });
//     },