<template>
  <v-app id="inspire">
    <v-app-bar app class="secondary" flat>
      <v-container class="py-0 fill-height">
        <v-avatar size="54px">
          <img src="./assets/JAMSLogo.png" />
        </v-avatar>

        <v-btn v-for="link in links" :key="link" text>
          {{ link }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-autocomplete
            class="primary"
            prepend-inner-icon="mdi-magnify"
            placeholder="Search Inventory"
            :items=searchItems
            flat
            hide-details
            dense
            solo
            rounded
            auto-select-first
          ></v-autocomplete>
        </v-responsive>
        <v-btn icon @click="toggleTheme"
          ><v-icon>mdi-brightness-4</v-icon></v-btn
        >
      </v-container>
    </v-app-bar>

    <v-main class="primary">
      <v-container>
        
      </v-container>
      <button v-google-signin-button="clientId" class="google-signin-button"> Login with Google</button>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    links: ["Dashboard", "Inventory"],
    searchItems: ["Apple", "Banana", "Cereal", "Rice"], /// need to query db for this list
  }),
  methods: {
    
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>

<script>
export default {
  data: () => ({
    clientId: 'cliend-id'
  }),
  methods: {
    OnGoogleAuthSuccess (idToken) {
      console.log(idToken)
      // Receive the idToken and make your magic with the backend
    },
    OnGoogleAuthFail (error) {
      console.log(error)
    }
  }
}
</script>

<style>
.google-signin-button {
  color: white;
  background-color: rgb(98, 98, 98);
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>