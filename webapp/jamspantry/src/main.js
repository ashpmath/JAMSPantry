import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import GoogleSignInButton from 'vue-google-signin-button-directive'

Vue.config.productionTip = false

new Vue({
  vuetify, GoogleSignInButton,
  render: h => h(App)
}).$mount('#app')
