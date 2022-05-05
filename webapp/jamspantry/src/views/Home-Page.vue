<template>
  <div>
    <v-container fluid>
      Welcome to JAMSPantry home page! Here you will find everything you need to
      know about your pantrys inventory to product information, expiration
      dates, and analytics.
      <v-spacer></v-spacer>
      <h2 style="padding-center: 100px">Expired Food</h2>
      <v-spacer></v-spacer>

      <v-alert
        color="red"
        dense
        elevation="20"
        outlined
        prominent
        text-color="black"
        text
        type="warning"
      >
        <v-data-table
          hide-default-header
          hide-default-footer
          :headers="headers"
          :items="expired"
          :items-per-page="5"
          item-key="name"
          class="elevation-1"
        >
        </v-data-table>
      </v-alert>
      <h2 style="padding-center: 100px">Food Expiring within 1 Week</h2>
      <v-alert
        color="yellow"
        dense
        elevation="20"
        outlined
        prominent
        text-color="black"
        text
        type="error"
      >
        <v-data-table
          hide-default-header
          hide-default-footer
          :headers="headers"
          :items="warning"
          :items-per-page="5"
          item-key="name"
          class="elevation-1"
        >
        </v-data-table>
      </v-alert>
      <div id="warning">
        <h2 style="padding-center: 100px">Humidity and Temperature Warnings</h2>
        <v-alert
          color="orange"
          dense
          elevation="20"
          outlined
          prominent
          text-color="black"
          text
          type="success"
        >
          <v-data-table
            hide-default-header
            hide-default-footer
            :headers="envirHead"
            :items="envir"
            :items-per-page="5"
            item-key="name"
            class="elevation-1"
          >
          </v-data-table>
        </v-alert>
      </div>
      <div id="weigh">
        <h2 style="padding-center: 100px">Weight Warnings</h2>
        <v-alert
          color="orange"
          dense
          elevation="20"
          outlined
          prominent
          text-color="black"
          text
          type="success"
        >
          <v-data-table
            hide-default-header
            hide-default-footer
            :headers="weighHead"
            :items="weigh"
            :items-per-page="5"
            item-key="name"
            class="elevation-1"
          >
          </v-data-table>
        </v-alert>
      </div>
    </v-container>
  </div>
</template>

<script>
import { auth, db } from "../firebase";
import { ref, query, get, orderByChild, onValue } from "firebase/database";

export default {
  data() {
    return {
      headers: [
        {
          text: "Pantry Good",
          align: "start",
          value: "description",
        },
        { text: "Expiration Date", value: "expir" },
      ],
      expired: [],
      warning: [],
      envirHead: [
        {
          text: "Pant",
          align: "start",
          value: "envirWarn",
        },
      ],
      envir: [],
      weighHead: [
        {
          text: "Pant",
          align: "start",
          value: "weighWarn",
        },
      ],
      weigh: [],
    };
  },

  methods: {
    getAlerts() {
      get(
        query(
          ref(db, auth.currentUser.uid + "/inventory"),
          orderByChild("description")
        )
      ).then((snapshot) => {
        if (snapshot.exists()) {
          const year = new Date().getFullYear();
          const month = new Date().getMonth() + 1;
          const day = new Date().getDay() + 1;
          this.expired = [];
          // expiration for loop
          for (const itemKey in snapshot.val()) {
            let dateArray = snapshot.val()[itemKey]["expiration"].split("/");
            // check if year is correct
            if (dateArray[2] < year) {
              this.expired.push({
                description: snapshot.val()[itemKey].description,
                expir: snapshot.val()[itemKey].expiration,
              });
            } else {
              if ((dateArray[2] == year) & (dateArray[0] < month)) {
                this.expired.push({
                  description: snapshot.val()[itemKey].description,
                  expir: snapshot.val()[itemKey].expiration,
                });
              } else {
                if ((dateArray[0] == month) & (dateArray[1] < day)) {
                  this.expired.push({
                    description: snapshot.val()[itemKey].description,
                    expir: snapshot.val()[itemKey].expiration,
                  });
                }
              }
            }
          }
          const check = new Date();
          check.setDate(check.getDate() + 6);
          const dayCheck = check.getDate() + 1;
          const monthCheck = check.getMonth() + 1;
          const yearCheck = check.getFullYear();
          this.warning = [];
          //warning loop
          for (const itemKey in snapshot.val()) {
            let dateArray = snapshot.val()[itemKey]["expiration"].split("/");
            if ((dateArray[2] <= yearCheck) & (dateArray[2] >= year)) {
              if ((dateArray[0] <= monthCheck) & (dateArray[0] >= month)) {
                if ((dateArray[1] <= dayCheck) & (dateArray[1] >= day)) {
                  this.warning.push({
                    description: snapshot.val()[itemKey].description,
                    expir: snapshot.val()[itemKey].expiration,
                  });
                }
              }
            }
          }
        } else {
          this.expired = [];
        }
      });
    },
    getTempHum() {
      let good = 0;
      get(query(ref(db, auth.currentUser.uid + "/Environment"))).then(
        (snapshot) => {
          if (snapshot.exists()) {
            const tempe = snapshot.val().Temperature.slice(-3);
            const tempCheck =
              (Number(tempe[0]) + Number(tempe[1]) + Number(tempe[2])) / 3;
            const humi = snapshot.val().Humidity.slice(-3);
            const humiCheck =
              (Number(humi[0]) + Number(humi[1]) + Number(humi[2])) / 3;
            this.envir = [];
            if (tempCheck > 19) {
              document.getElementById("warning").style.visibility = "visible";
              this.envir.push({
                envirWarn: "Temperature too High!",
              });
              good = 1;
            }
            if (humiCheck > 40) {
              document.getElementById("warning").style.visibility = "visible";
              this.envir.push({
                envirWarn: "Humidity too High!",
              });
              good = 1;
            }
            if (good != 1) {
              this.envir.push({
                envirWarn: "No warning",
              });
              document.getElementById("warning").style.visibility = "hidden";
            }
            this.weigh = [];
            if (
              Number(snapshot.val().Weight) < 1 &&
              Number(snapshot.val().Weight) != -1
            ) {
              document.getElementById("weigh").style.visibility = "visible";
              this.weigh.push({
                weighWarn: "Container empty",
              });
            } else if (
              Number(snapshot.val().Weight) < 10 &&
              Number(snapshot.val().Weight) != -1
            ) {
              document.getElementById("weigh").style.visibility = "visible";
              this.weigh.push({
                weighWarn: "Container is running low",
              });
            } else {
              document.getElementById("weigh").style.visibility = "hidden";
            }
          }
        }
      );
    },
  },

  mounted() {
    onValue(ref(db, auth.currentUser.uid + "/Environment"), () => {
      this.getTempHum();
    });
    onValue(ref(db, auth.currentUser.uid + "/inventory"), () => {
      this.getAlerts();
    });
  },
};
</script>