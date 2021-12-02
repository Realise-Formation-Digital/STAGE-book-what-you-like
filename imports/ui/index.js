import Vue from 'vue'
import './plugins/tracker.js'
import vuetify from "./plugins/vuetify";
import router from "./plugins/router";
import i18next from 'i18next';
import {resources} from './translations';
import App from './App';


i18next.init({
  lng: 'en' ,
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