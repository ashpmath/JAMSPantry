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
                  scanIn = true;
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
                  scanIn = false;
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
            <v-col>
              <v-select
                v-model="monthSelect"
                :items="months"
                label="Month"
                outlined
                @input="getValidDays"
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                v-model="daySelect"
                :items="days"
                label="Day"
                outlined
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                v-model="yearSelect"
                :items="years"
                label="Year"
                outlined
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-btn color="secondary" @click="e1 = 3"> Next </v-btn>
            <v-btn
              text
              @click="
                e1 = 1;
                resetForm();
              "
            >
              Cancel
            </v-btn>
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
        <v-btn
          text
          @click="
            e1 = 1;
            resetForm();
          "
        >
          Cancel
        </v-btn>
      </v-stepper-content>

      <!-- Overview -->
      <v-stepper-step step="4" complete complete-icon="mdi-playlist-check">
        Overview
      </v-stepper-step>
      <v-stepper-content step="4">
        <v-btn
          color="secondary"
          @click="
            e1 = 1;
            if (scanIn) {
              addItem();
            } else {
              removeItem();
            }
          "
          >Submit</v-btn
        >
        <v-btn
          text
          @click="
            e1 = 1;
            resetForm();
          "
        >
          Cancel
        </v-btn>
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
    e1: 2,
    scanIn: null,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    days: null,
    years: Array((new Date().getFullYear()+100) - (new Date().getFullYear()) + 1)
        .fill()
        .map((_, idx) => new Date().getFullYear() + idx),
    monthSelect: null,
    daySelect: null,
    yearSelect: null,
  }),
  methods: {
    addItem() {
      this.$root.toastItem.show({ message: "Item added!" });
      this.resetForm();
    },
    removeItem() {
      this.$root.toastItem.show({ message: "Item removed!" });
      this.resetForm();
    },
    range(start, end) {
      return Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx);
    },
    getValidDays() {
      if ([1, 3, 5, 7, 8, 10, 12].includes(this.monthSelect)) {
        this.days = this.range(1, 31);
      } else if (this.monthSelect == 2) {
        this.days = this.range(1, 28);
      } else {
        this.days = this.range(1, 30);
      }
      this.daySelect = null;
    },
    resetForm() {
      this.days = null;
      this.monthSelect = null;
      this.daySelect = null;
      this.yearSelect = null;
    },
  },
};
</script>
<style>
.theme--light.v-stepper .v-stepper__step__step .v-icon {
  color: #1d1e1b !important;
}
.theme--light.v-btn {
  color: #1d1e1b !important;
}
::-webkit-scrollbar {
  display: none;
}
</style>