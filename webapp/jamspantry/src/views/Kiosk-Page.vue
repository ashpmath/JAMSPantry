<template>
  <v-container>
    <v-stepper v-model="e1" vertical>
      <!-- Select Scan In/Out -->
      <v-stepper-step step="1" complete complete-icon="mdi-swap-vertical">
        Scan In/Out
      </v-stepper-step>
      <v-stepper-content step="1">
        <v-container>
          <v-row>
            <v-col align="center">
              <v-btn
                height="125px"
                width="210px"
                color="secondary"
                @click="
                  e1 = 2;
                  inOutSelect = 'IN';
                "
              >
                <v-icon left> mdi-import </v-icon>
                Scan In
              </v-btn>
            </v-col>
            <v-col align="center">
              <v-btn
                height="125px"
                width="210px"
                color="secondary"
                @click="
                  e1 = 3;
                  inOutSelect = 'OUT';
                "
              >
                <v-icon left> mdi-export </v-icon>
                Scan Out
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-stepper-content>

      <!-- Expiration Date Picker -->
      <v-stepper-step step="2" complete complete-icon="mdi-calendar-clock">
        Expiration Date
      </v-stepper-step>
      <v-stepper-content step="2">
        <v-container>
          <v-row>
            <v-col align="center">
              <v-date-picker v-model="expirationDate"> </v-date-picker>
            </v-col>
          </v-row>
          <v-row>
            <v-btn color="secondary" @click="e1 = 3"> Continue </v-btn>
            <v-btn text @click="e1 = 1"> Cancel </v-btn>
          </v-row>
        </v-container>
      </v-stepper-content>

      <!-- Camera Viewer -->
      <v-stepper-step step="3" complete complete-icon="mdi-barcode-scan">
        Scan Barcode
      </v-stepper-step>
      <v-stepper-content step="3">
        <div id="cameraDiv">
          <cameraItem />
        </div>
        <v-btn color="secondary" @click="e1 = 4">Next</v-btn>
        <v-btn text @click="console.log(this.$router)"> Cancel </v-btn>
      </v-stepper-content>

      <!-- Overview -->
      <v-stepper-step step="4" complete complete-icon="mdi-playlist-check">
        Overview
      </v-stepper-step>
      <v-stepper-content step="4">
        <v-btn color="secondary" @click="e1 = 1">Submit</v-btn>
        <v-btn text @click="e1 = 1"> Cancel </v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>

<script>
import cameraItem from "../components/Camera-Item.vue";
export default {
  name: "cameraDiv",
  components: {
    cameraItem,
  },
  data: () => ({
    e1: 1,
    expirationDate: null,
    inOutSelect: null,
  }),
  methods: {
    addItem() {
      // process close date
      var dCur = new Date(this.expirationDate);
      var expirationDateMod = "";
      if (this.expirationDate != null) {
        expirationDateMod =
          dCur.getFullYear() +
          "-" +
          (dCur.getMonth() + 1) +
          "-" +
          (dCur.getDate() + 1);
      }
      return expirationDateMod;
    },
  },
};
</script>
<style>
.theme--light.v-stepper .v-stepper__step__step .v-icon {
  color: black !important;
}
.theme--light.v-btn {
  color: black !important;
}
</style>