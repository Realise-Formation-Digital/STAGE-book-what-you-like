import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Things from "../pages/Things";
import User from "../pages/User";
import Category from "../pages/Category";
import Reservation from "../pages/Reservation";
import { paths } from "../libs/defaultValues";
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
  },
  {
    path: paths.things, component: Things, name: 'Things'
  },
  {
    path: paths.user, component: User, name: 'User'
  },
  {
    path: paths.category, component: Category, name: 'Category'
  },
  {
    path: paths.reservation, component: Reservation, name: 'Reservation'
  },

]

export default new VueRouter({
  mode: 'history',
  routes: routes
})
