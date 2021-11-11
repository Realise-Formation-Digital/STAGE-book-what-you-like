<template>
  <div>
    <v-app-bar
        dark
        app
    >
      <v-app-bar-nav-icon @click="onShowHideSidenav()"></v-app-bar-nav-icon>

      <v-toolbar-title>Book what you want!</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn icon to="/about-us">
        <v-icon>mdi-information</v-icon>
      </v-btn>

      <v-btn icon to="/contact-us">
        <v-icon>mdi-card-account-mail</v-icon>
      </v-btn>
    </v-app-bar>

    <Sidebar ref="sidebar"/>
  </div>
</template>

<script>
import Sidebar from "./Sidebar";
export default {
  name: "Navbar",
  components: {Sidebar},
  methods: {
    onShowHideSidenav(){
      this.$refs.sidebar.showHideSidenav()
    }
  }
}
</script>

<style scoped>

</style>