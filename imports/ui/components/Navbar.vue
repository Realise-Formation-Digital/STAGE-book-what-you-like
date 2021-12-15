<template>
  <div>
    <v-app-bar dark app>
      <v-app-bar-nav-icon @click="onShowHideSidenav()"></v-app-bar-nav-icon>

      <v-toolbar-title @click="clickBoutton()"
        >Book what you want!</v-toolbar-title
      >

      <v-spacer></v-spacer>
      <v-btn x-small color="secondary" dark @click="getTranslation()">
        fr
      </v-btn>
      <v-btn x-small color="secondary" dark @click="getTranslation()">
        en
      </v-btn>

      <v-btn icon to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn icon to="/about-us">
        <v-icon>mdi-information</v-icon>
      </v-btn>

      <v-btn icon to="/contact-us">
        <v-icon>mdi-card-account-mail</v-icon>
      </v-btn>
      <v-btn icon to="/things">
        <v-icon>mdi-tag-plus-outline</v-icon>
      </v-btn>
      <v-btn icon to="/user">
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
    </v-app-bar>

    <Sidebar ref="sidebar" />
    <v-dialog v-model="showDialog" width="600px">
      <v-card>
        <v-card-text>Congratulations you have found an ester egg </v-card-text>
        <v-spacer></v-spacer>
        <v-card-text>Here are the people who created this app </v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-card-text>Marco Tribuzio</v-card-text>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card-text>Dawit Abraha</v-card-text>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card-text>Lionel Schuster</v-card-text>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card-text>Davide Dos Santos</v-card-text>
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-icon>mdi-emoticon-cool-outline</v-icon>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import i18nMixin from "../mixins/i18n";
import Sidebar from "./Sidebar";

export default {
  mixins: [i18nMixin],
  name: "Navbar",
  components: { Sidebar },

  data() {
    return {
      numclick: 0,
      showDialog: false,
    };
  },

  methods: {
    onShowHideSidenav() {
      this.$refs.sidebar.showHideSidenav();
    },
    clickBoutton() {
      this.numclick = this.numclick + 1;
      console.log(this.numclick);
      if (this.numclick === 5) this.showdialogEgg();
    },
    showdialogEgg() {
      this.showDialog = true;
    },
  },
};
</script>

<style scoped>
</style>