<template>
  <v-app id="inspire">
    <v-app-bar app class="secondary" flat>
      <v-container class="py-0 fill-height">
        <v-avatar 
        size="54px"
        @click="$router.push('/dashboard')"
        ><img src="./assets/JAMSLogo.png" />
        </v-avatar>
        <v-toolbar-title
        style="cursor: pointer"
        @click="$router.push('/dashboard')"
        ><h2>JAMSPantry</h2></v-toolbar-title>

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

    <v-main class="ma-4"><router-view /></v-main>
    <toastItem ref="toastItem" />

  </v-app>
</template>

<script>
import toastItem from "./components/Toast-Item.vue"
import { signOut, getAuth } from "firebase/auth"
export default {
  components: {
    toastItem,
  },
  mounted() {
    this.$root.toastItem = this.$refs.toastItem;
  },
  computed: {
    isSignedIn() {
      return this.$route.name !== "Login" && this.$route.name !== "Poll";
    },
  },
  data: () => ({
    links: ["Dashboard", "Inventory"],
    searchItems: ["Apple", "Banana", "Cereal", "Rice"], /// need to query db for this list
  }),
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {
          alert(error.message);
          this.$router.push("/");
        });
    },
  },
};
</script>