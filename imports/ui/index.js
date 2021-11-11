import Vue from 'vue'
import './plugins/tracker.js'
import vuetify from "./plugins/vuetify";
import router from "./plugins/router";

import App from './App'

Meteor.startup(() => {
  new Vue({
    el: '#app',
    vuetify: vuetify,
    router: router,
    ...App,
  })
})