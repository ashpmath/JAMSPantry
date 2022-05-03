<template>
  <div>
    <v-card>
      <div id="app" style="width:70%;">
    <h1 style="padding-center:80px;">Pantry Temperature and Humidity</h1>
    <GChart
      type="AreaChart"
      color="green"
      :data="chartData"
      :options="chartOptions"
    />    
  </div>
    </v-card>
    <v-container fluid>
      
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
        ["Environment", "Value"],
        ["Temperature", this.getTemperature()], //this.getTemperature()
        ["Humidity", this.getHumidity()],    //this.getHumidity()
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