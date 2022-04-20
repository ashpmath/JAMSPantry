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
                  resetForm();
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
                  resetForm();
                  scanIn = false;
                  e1 = 3;
                  $refs.barcode.focus();
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
            <v-btn
              color="secondary"
              @click="
                e1 = 3;
                $refs.barcode.focus();
              "
            >
              Next
            </v-btn>
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

      <!-- Scan Barcode -->
      <v-stepper-step step="3" complete complete-icon="mdi-barcode-scan">
        Scan Barcode
      </v-stepper-step>
      <v-stepper-content step="3">
        <v-container>
          <v-col>
            <v-row>
              <v-otp-input
                class="otpScaler"
                v-model="barcode"
                color="#1b1c19"
                ref="barcode"
                length="12"
                @finish="decode"
              ></v-otp-input>
            </v-row>
            <v-row>
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
          </v-col>
        </v-container>
      </v-stepper-content>

      <!-- Overview -->
      <v-stepper-step step="4" complete complete-icon="mdi-playlist-check">
        Overview
      </v-stepper-step>
      <v-stepper-content step="4">
        <v-container>
          <v-row>
            <v-col>
              <v-img
                class="mb-2"
                :max-height="150"
                :max-width="150"
                contain
                v-bind:src="getImageURL()"
              ></v-img>
            </v-col>
            <v-col>
              <v-textarea
                label="Expiration Date"
                outlined
                disabled
                rows="1"
                no-resize
                :value="getExpiration()"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-textarea
              label="Description"
              outlined
              disabled
              rows="3"
              no-resize
              :value="getDescription()"
            ></v-textarea>
          </v-row>
          <v-row>
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
          </v-row>
        </v-container>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>

<script>
import { db, auth } from "../firebase";
import { push, ref } from "firebase/database";
export default {
  data: () => ({
    e1: 1,
    scanIn: null,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    days: null,
    years: Array(new Date().getFullYear() + 100 - new Date().getFullYear() + 1)
      .fill()
      .map((_, idx) => new Date().getFullYear() + idx),
    monthSelect: null,
    daySelect: null,
    yearSelect: null,

    // data from barcode monster api
    barcode: "",
    scannedItem: null,
    description: "",
    image_url: "",
  }),
  mounted() {
      this.$vuetify.theme.dark = false;
  },
  methods: {
    addItem() {
      // add expiration date to the item json
      this.scannedItem["expiration"] = this.getExpiration();

      // push json to users inventory in firebase
      push(ref(db, auth.currentUser.uid + "/inventory"), this.scannedItem);

      // push a toast message and reset vars
      this.$root.toastItem.show({ message: "Item added!" });
    },
    removeItem() {
      this.$root.toastItem.show({ message: "Item removed!" });
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
      this.scannedItem = null;
      this.image_url = null;
      this.barcode = null;
    },
    decode(code) {
      // http GET from barcode monster api
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open(
        "GET",
        "https://barcode-monster.p.rapidapi.com/" + code,
        false // for synchronous request
      );
      xmlHttp.setRequestHeader(
        "X-RapidAPI-Host",
        "barcode-monster.p.rapidapi.com"
      );
      xmlHttp.setRequestHeader(
        "X-RapidAPI-Key",
        "76579cba9emsh57068918fcc1d42p13ba42jsnaa6b82d06bd2"
      );
      xmlHttp.send(null);
      this.scannedItem = JSON.parse(xmlHttp.responseText);

      // parse JSON into values
      this.scannedItem.description = this.scannedItem.description.replace(
        "(from barcode.monster)",
        ""
      );
      this.description = this.scannedItem.description;
      this.image_url = this.scannedItem.image_url;

      // go to Overview Page
      this.e1 = 4;
    },
    getDescription() {
      if (this.description != "") {
        return this.description;
      }
      return "Description not available.";
    },
    getImageURL() {
      if (this.image_url != "") {
        return this.image_url;
      }
      return "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
    },

    getExpiration() {
      return this.monthSelect + "/" + this.daySelect + "/" + this.yearSelect;
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
.otpScaler {
  zoom: 0.82;
}
.theme--light.v-application .primary {
    background-color: #cacac6 !important;
}
</style>