import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import {paths} from "../libs/defaultValues";
Vue.use(VueRouter)

const routes = [
  {
    path: paths.home, component: Home, name: 'Home'
  },
  {
    path: paths.aboutUs, component: AboutUs, name: 'About Us'
  },
  {
    path: paths.contactUs, component: ContactUs, name: 'Contact Us'
  }
]

export default new VueRouter({
  mode: 'history',
  routes: routes
})