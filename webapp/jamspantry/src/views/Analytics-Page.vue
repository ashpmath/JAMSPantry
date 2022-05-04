<template>
  <div>
    <v-container fluid>
    <v-card>
      <div id="app" style="width:70%;">
    <h1 style="padding-center:80px;">Pantry Temperature and Humidity</h1>
    <GChart
      type="AreaChart"
      :data="chartData"
      :options="chartOptions"
    />    
  </div>

    <div id="app" style="width:70%;">
    <h1 style="padding-center:80px;">Expiration Dates</h1>
    <GChart
      type="ColumnChart"
      :data="chartData2"
      :options="chartOptions"
    />    </div>
    <div id="app" style="width:70%;">
    <h1 style="padding-center:80px;">Container Capacity</h1>
    <GChart
      type="PieChart"
      :data="chartData3"
      :options="chartOptions"
      :colors="chartOptions"
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
// </script>

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
        query(ref(db, auth.currentUser.uid + "/Environment"),
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
        query(ref(db, auth.currentUser.uid + "/Environment"),
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
        ["Time", "Temperature", "Humidity", { role: 'style' }],
        ["1", 20, 40, '#662200'], 
        ["2", 30,25, '#006644'],    
      ],
      chartData2: [
        ["Expiration Dates", "Products", { role: 'style' }],
        ["0-1", 8,'#006644'], //this.getTemperature()
        ["1-3", 3, '#006644'],    //this.getHumidity()
        ["3-5", 4, '#006644'],    //this.getHumidity()
        ["6+", 10, '#006644'],    //this.getHumidity()
      ],
      chartData3: [
        ["Status", "Percentage", "NULL",{ role: 'style' } ],
        ["Filled", 60, 0, '#b82606'], //this.getTemperature()
        ["Empty", 40, 0, '#3b2606'],    //this.getHumidity()
      ],
      chartOptions: {
        chart: {
          title: "Temperature and Humidity",
          subtitle: "By Hour"
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
    //   onValue(ref(db, auth.currentUser.uid + "/Environment/humidity"), (snapshot) => {
    //     console.log(snapshot.val);
    // });
    // },