<template>
  <v-navigation-drawer v-model="showSideNav" absolute temporary>
    <v-list nav dense>
      <v-list-item-group active-class="deep-purple--text text--accent-4">
        <v-list-item link :to="paths.home">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

        <v-list-item link :to="paths.aboutUs">
          <v-list-item-icon>
            <v-icon>mdi-information</v-icon>
          </v-list-item-icon>
          <v-list-item-title>About Us</v-list-item-title>
        </v-list-item>



        <v-list-item link :to="paths.contactUs">
          <v-list-item-icon>
            <v-icon>mdi-card-account-mail</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Contact Us</v-list-item-title>
        </v-list-item>



        <v-list-item link :to="paths.category">
          <v-list-item-icon>
            <v-icon>mdi-card-account-mail</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Category</v-list-item-title>
        </v-list-item>



        <v-list-item link :to="paths.reservation">
          <v-list-item-icon>
            <v-icon>mdi-card-account-mail</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Reservation</v-list-item-title>
        </v-list-item>


        <!-- <v-list-item link :to="paths.category">
          <v-list-item-icon>
            <v-list-item link :to="paths.reservation">
              <v-list-item-icon>
                <v-icon>mdi-card-account-mail</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Category</v-list-item-title>
            </v-list-item>
          </v-list-item-icon>
          <v-list-item-title>Reservation</v-list-item-title>
        </v-list-item> -->
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { paths } from "../libs/defaultValues";
export default {
  name: "Sidebar",
  data: () => {
    return {
      showSideNav: false,
      paths: paths,
    };
  },
  methods: {
    showHideSidenav() {
      console.log("click received");
      this.showSideNav = !this.showSideNav;
    },
  },
};
</script>

<style scoped>
</style>