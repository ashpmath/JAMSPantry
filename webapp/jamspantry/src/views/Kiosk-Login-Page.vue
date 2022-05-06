<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-card
        class="justify-center"
        max-width="425px"
        min-width="425px"
        elevation="16"
      >
        <v-tabs background-color="secondary" icons-and-text grow>
          <v-tabs-slider color="accent"></v-tabs-slider>
          <v-tab :key="0">
            <v-icon>mdi-key-wireless</v-icon>
            <v-card-title class="pa-0"> Remote Login </v-card-title>
          </v-tab>
          <v-tab-item> </v-tab-item>
        </v-tabs>
        <vue-qr :style="qrStyle" v-bind:text="getQrCode()" :size="425"></vue-qr>
        <v-card-text class="text-center pa-0 mb-2" style="font-size: 1.1em">
          Scan the QR code above to login on another device.
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import VueQr from "vue-qr";
import { db } from "../firebase";
import { push, ref, onValue, remove } from "firebase/database";
export default {
  name: "Kiosk-Login-Page",
  data: () => ({ key: "1234" }),
  components: { VueQr },
  methods: {
    getQrCode() {
      return "https://jamspantry.web.app/remote-login/" + this.key;
    },
  },
  mounted() {
    // set theme to light for best viewing on kiosk LCD
    this.$vuetify.theme.dark = false;

    // push a unique key to firebase with 'pending' value
    // and the key will get put into the qr code
    this.key = push(ref(db, "/keys"), "pending")._path.pieces_[1];

    // start firebase listener on the key generated for the value to
    // get changed to the user id meaing the user signed in on other
    // device and wrote their user id
    onValue(ref(db, "/keys", this.key), (snapshot) => {
      const uid = snapshot.val()[this.key];
      if (uid != "pending" && uid != undefined) {
        // delete the key from database
        remove(ref(db, "keys/" + this.key));

        // route to the kiosk page and pass it the uid to use to
        // push inventory to the database
        this.$router.push({ name: "Kiosk", params: { uid: uid } }).catch();
      }
    });
  },
  computed: {
    qrStyle() {
      if (this.$vuetify.theme.dark) {
        return {
          filter: "invert(87%) brightness(90%)",
        };
      }
      return "";
    },
  },
};
</script>
<style>
.theme--light.v-tabs--icons-and-text > .v-tabs-bar .v-tab > *:first-child {
  color: #1b1c19 !important;
}
.theme--light.v-tabs-bar .v-tab {
  color: #1b1c19 !important;
}
::-webkit-scrollbar {
  display: none;
}
.body {
  scrollbar-width: none;
  cursor: none;
}
</style>