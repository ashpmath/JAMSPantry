import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

/* Analyzed bindings: {
  "say": "options"
} */

const __sfc__ = {
  methods: {
	  say(message) {
    	alert(message)
  	}
	}
}

import { createElementVNode as _createElementVNode, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _createElementVNode("button", {
      onClick: _cache[0] || (_cache[0] = $event => ($options.say('Login')))
    }, "Say hi"),
    _createElementVNode("button", {
      onClick: _cache[1] || (_cache[1] = $event => ($options.say('SignUp')))
    }, "Say what")
  ], 64 /* STABLE_FRAGMENT */))
}
__sfc__.render = render
__sfc__.__file = "App.vue"
export default __sfc__


