<template>
  <v-app>
    <v-app-bar app class="secondary" flat>
      <v-container class="py-0 fill-height">
        <v-img
          style="cursor: pointer"
          @click="logoClick"
          class="mx-2"
          src="./assets/JAMSLogo.png"
          max-height="40"
          max-width="40"
          contain
        ></v-img>
        <v-toolbar-title
          style="cursor: pointer"
          @click="logoClick"
          ><h2>JAMS Pantry</h2></v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-btn v-if="isSignedIn" class="accent" @click="logout">Logout</v-btn>
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
import toastItem from "./components/Toast-Item.vue";
import { signOut, getAuth } from "firebase/auth";

export default {
  components: {
    toastItem, 
  },
  mounted() {
    this.$root.toastItem = this.$refs.toastItem;
  },
  computed: {
    isSignedIn() {
      return (this.$route.name !== "Login") && (this.$route.name !== 'Kiosk Login') && (this.$route.name !== 'Kiosk') && (this.$route.name !== 'Remote Login') && (this.$route.name !== 'Remote Confirmation')
    },
  },
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
    logoClick() {
      if ((this.$route.name !== "Login") && (this.$route.name !== 'Kiosk Login') && (this.$route.name !== 'Kiosk') && (this.$route.name !== 'Remote Login')) {
        this.$router.push('/dashboard')
      }
    }
  },
   template: "<Graph-Page.vue/>"
};
</script>

<style>
.v-snack__content {
  color: #1d1e1b;
}
</style>