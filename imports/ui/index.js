import Vue from 'vue'
import './plugins/tracker.js'
import vuetify from "./plugins/vuetify";
import router from "./plugins/router";
import i18next from 'i18next';
import App from './App';
import { resources } from './translations';

i18next.init({
  lng: 'fr', // if you're using a language detector, do not define the lng option
  debug: true,
  resources
});

Meteor.startup(() => {
  new Vue({
    el: '#app',
    vuetify: vuetify,
    router: router,
    ...App,
  })
})