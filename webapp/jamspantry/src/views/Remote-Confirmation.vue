<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-card
        class="justify-center"
        max-width="600px"
        min-width="300px"
        elevation="24"
      >
        <v-tabs background-color="secondary" icons-and-text grow>
          <v-tabs-slider color="accent"></v-tabs-slider>
          <v-tab :key="0">
            <v-icon>mdi-check</v-icon>
            <v-card-title class="pa-0"> Login Confirmation </v-card-title>
          </v-tab>
          <v-tab-item> </v-tab-item>
        </v-tabs>
        <v-card-text class="text-center pa-0 mt-4 mb-4" style="font-size: 1.1em">
          The remote login was successful, you can now close this page.
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

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
</style>