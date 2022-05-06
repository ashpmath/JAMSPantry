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
                  $refs.barcode.focus();
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
                  e1 = 2;
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

      <!-- Scan Barcode -->
      <v-stepper-step step="2" complete complete-icon="mdi-barcode-scan">
        Scan Barcode
      </v-stepper-step>
      <v-stepper-content step="2">
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

      <!-- Expiration Date Picker -->
      <v-stepper-step step="3" complete complete-icon="mdi-calendar-clock">
        Expiration Date
      </v-stepper-step>
      <v-stepper-content step="3">
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
              large
              @click="
                if (verifyDate()) {
                  e1 = 4;
                  $refs.barcode.focus();
                }
              "
            >
              Next
            </v-btn>
            <v-btn
              text
              large
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
          <v-row class="ma-1">
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
import { db } from "../firebase";
import {
  push,
  ref,
  remove,
  query,
  get,
  orderByChild,
  equalTo,
} from "firebase/database";
export default {
  data: () => ({
    e1: 1,                 // stage of stepper
    scanIn: null,          // scan in vs out bool
    months: null,          // months to select from for expiration
    days: null,            // days to select from for expiration
    years: null,           // years to select from for expiration
    monthSelect: null,     // selected month for expiration
    daySelect: null,       // selected day for expiration
    yearSelect: null,      // selected year for expiration
    uid: null,             // user id that was got during route from kiosk-login page
    itemKey: null,         // the DB key of the item to be removed
    optionsToRemove: null, // JSON of the options to remove when multiple items
    barcode: null,         // UPC barcode
    scannedItem: null,     // JSON of item getting added to DB
    description: null,     // description of scanned object got from API
    image_url: null,       // image url got from API
  }),
  mounted() {
    // set theme to light by default for kiosk because LCD = Bad view in dark
    this.$vuetify.theme.dark = false;

    // store the uid got from the kiosk login page router
    this.uid = this.$route.params.uid;

    // init value by calling reset func
    this.resetForm();
  },
  methods: {
    // method to add objects from DB after hitting submit button
    addItem() {
      // add expiration date to the item json
      this.scannedItem["expiration"] = this.getExpiration();

      // push json to users inventory in firebase
      push(ref(db, this.uid + "/inventory"), this.scannedItem);

      // push a toast message and reset vars
      this.$root.toastItem.show({ message: "Item added!" });
    },

    // method to remove objects from DB after hitting submit button
    removeItem() {
      remove(ref(db, this.uid + "/inventory/" + this.itemKey));
      this.$root.toastItem.show({ message: "Item removed!" });
    },
    
    // helper function to get array of whole nums for dates
    range(start, end) {
      return Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx);
    },

    // method to get the days based on the selected month
    getValidDays() {
      if (this.scanIn) {
        if ([1, 3, 5, 7, 8, 10, 12].includes(this.monthSelect)) {
          this.days = this.range(1, 31);
        } else if (this.monthSelect == 2) {
          this.days = this.range(1, 28);
        } else {
          this.days = this.range(1, 30);
        }
        this.daySelect = null;
      }
    },

    // method to reset all vars in the form
    resetForm() {
      this.optionsToRemove = null;
      this.monthSelect = null;
      this.daySelect = null;
      this.yearSelect = null;
      this.scannedItem = null;
      this.image_url =
        "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
      this.barcode = null;
      this.itemKey = null;
      this.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      this.days = null;
      this.years = Array(
        new Date().getFullYear() + 100 - new Date().getFullYear() + 1
      )
        .fill()
        .map((_, idx) => new Date().getFullYear() + idx);
    },

    // method called after a barcode is scanned for out and in
    decode(code) {
      if (this.scanIn) {
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

        // check if the API had the item in it's DB
        if (this.scannedItem.status == "active") {
          // parse JSON into values
          this.scannedItem.description = this.scannedItem.description.replace(
            "(from barcode.monster)",
            ""
          );
          this.description = this.scannedItem.description;
          this.image_url = this.scannedItem.image_url;

          this.e1 = 3; // go to select expiration date for scanning item in
        } else {
          // API did not have the barcode in DB so generate an empty json
          this.scannedItem["class"] = "UPCA";
          this.scannedItem["code"] = code;
          this.scannedItem["company"] = "";
          this.scannedItem["description"] = "Description not available.";
          this.description = "Description not available.";
          this.scannedItem["image_url"] = "";
          this.scannedItem["size"] = "";
          this.scannedItem["status"] = "";
          this.e1 = 3; // go to select expiration date for scanning item in
        }
      }
      // scanning out so check for duplicates to determine if experiation date picker is needed
      else {
        get(
          query(
            ref(db, this.uid + "/inventory"),
            orderByChild("code"),
            equalTo(code)
          )
        ).then((snapshot) => {
          // found at least one matching barcode in DB
          if (snapshot.exists()) {
            let numFound = Object.keys(snapshot.val()).length;
            // only one occurence
            if (numFound == 1) {
              this.itemKey = Object.keys(snapshot.val())[0];
              let item = snapshot.val()[this.itemKey];
              this.monthSelect = item["expiration"].split("/")[0];
              this.daySelect = item["expiration"].split("/")[1];
              this.yearSelect = item["expiration"].split("/")[2];
              this.description = item["description"];
              this.image_url = item["image_url"];
              this.e1 = 4;
            }
            // more than one item, get all valid dates to select from
            else {
              this.months = [];
              this.days = [];
              this.years = [];

              for (var itemKey in snapshot.val()) {
                let dateArray = snapshot
                  .val()[itemKey]["expiration"].split("/");
                if (!this.months.includes(dateArray[0])) {
                  this.months.push(dateArray[0]);
                }
                if (!this.days.includes(dateArray[1])) {
                  this.days.push(dateArray[1]);
                }
                if (!this.years.includes(dateArray[2])) {
                  this.years.push(dateArray[2]);
                }

                // all items are the same expiration date so no need to ask for it
                if (
                  this.months.length == 1 &&
                  this.days.length == 1 &&
                  this.years.length == 1
                ) {
                  this.itemKey = Object.keys(snapshot.val())[0];
                  let item = snapshot.val()[this.itemKey];
                  this.monthSelect = item["expiration"].split("/")[0];
                  this.daySelect = item["expiration"].split("/")[1];
                  this.yearSelect = item["expiration"].split("/")[2];
                  this.description = item["description"];
                  this.image_url = item["image_url"];
                  this.e1 = 4;
                }
                // multiple items and multiple expirations so have to ask for date 
                else {
                  this.days = this.days.sort();
                  this.months = this.months.sort();
                  this.years = this.years.sort();
                  this.daySelect = null;
                  this.monthSelect = null;
                  this.yearSelect = null;
                  this.optionsToRemove = snapshot.val();
                  this.e1 = 3;
                }
              }
            }
          } else {
            this.$root.toastItem.show({
              message: "Item not found, scan canceled",
            });
            this.resetForm();
            this.e1 = 1;
          }
        });
      }
    },

    // method to get a description or text to display if not available
    getDescription() {
      if (this.description != "") {
        return this.description;
      }
      return "Description not available.";
    },

    // method to get a image url or url for "image not available" image
    getImageURL() {
      if (this.image_url != "") {
        return this.image_url;
      }
      return "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
    },

    // method to piece together an expiration date
    getExpiration() {
      return this.monthSelect + "/" + this.daySelect + "/" + this.yearSelect;
    },

    // method to verify a date is selected and if scanning out, verify the date is in the DB
    verifyDate() {
      // verify date selected
      if (
        this.daySelect == null ||
        this.monthSelect == null ||
        this.yearSelect == null
      ) {
        this.$root.toastItem.show({ message: "Pick a valid date." });
        return false;
      }

      // if scanning out, need to verify that the date is a valid date in the DB
      if (!this.scanIn) {
        for (var itemKey in this.optionsToRemove) {
          let dateArray = this.optionsToRemove[itemKey]["expiration"].split("/");
          if (
            this.monthSelect == dateArray[0] &&
            this.daySelect == dateArray[1] &&
            this.yearSelect == dateArray[2]
          ) {
            this.itemKey = itemKey;
            return true
          }
        }
      }
      else {
        return true;
      }
      this.$root.toastItem.show({ message: "Pick a valid date." });
      return false;
    },
  },
};
</script>

<style>
/* custom css to ensure icon is visible in light theme */
.theme--light.v-stepper .v-stepper__step__step .v-icon {
  color: #1d1e1b !important;
}
/* custom css to ensure button text is visible in light theme */
.theme--light.v-btn {
  color: #1d1e1b !important;
}
/* custom css to ensure icon circles are visible in light theme */
.theme--light.v-application .primary {
  background-color: #ebebdd !important;
}
/* custom css to ensure selected date is visible in drop down light theme */
.v-application .primary--text {
    color: #000000 !important;
}
/* css to remove scrollbar on the kiosk page */
::-webkit-scrollbar {
  display: none;
}
/* css to scale the otp barcode input to fit on raspberry pi screen */
.otpScaler {
  zoom: 0.82;
}
/* css to hide scrollbar and cursor for firefox */
.body {
  scrollbar-width: none;
  cursor: none;
}
</style>