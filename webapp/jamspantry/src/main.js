import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueAnalytics from 'vue-analytics';  // Analytics - type "npm install vue-analytics" in cmd prompt, track website traffic using Google Analytics
import { initializeApp } from "firebase/app";   
import { getAnalytics } from "firebase/analytics"; // Firebase Anayltics

// ANALYTICS PART 
// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics and get a reference to the service
const analytics = getAnalytics(app);

// alias
Vue.prototype.$analytics = firebase.analytics();

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

// Configuration VueAnalytics
Vue.use(VueAnalytics, {
  id: 'UA-xxxxxxxxx-x'   // we will need to change this part once setup
});

// track events
this.$analytics.logEvent("notification_received");