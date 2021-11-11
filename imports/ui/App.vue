<template>
  <v-app>
    <Navbar/>
    <v-main>
      <router-view/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default {
  components: {
    Navbar,
    Footer
  },
}
</script>

<style>
</style>
