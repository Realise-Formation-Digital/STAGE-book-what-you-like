<template>
  <v-container>
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat>
            <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
            >
              Today
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small> mdi-chevron-left </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small> mdi-chevron-right </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            type="week"
            :events="events"
            :event-color="getEventColor"
          ></v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>

  <!-- <h1>Calendar</h1> -->
</template>

<script>
import categoriesCollection from "../collections/categoriesCollection";
import reservationsCollection from "../collections/reservationsCollection";
import thingsCollection from "../collections/thingsCollection";
import dateMixin from "../mixins/date";

export default {
  mixins: [dateMixin],
  data: () => ({
    focus: "",
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
    categories: ["John Smith"],
  }),

  methods: {
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
  },

  name: "Calendar",
  meteor: {
    $subscribe: {
      categoriesList: [],
      reservationsList: [],
      thingsList: [],
    },
    categoriesList() {
      console.log("Categories", categoriesCollection.find().fetch());
      return categoriesCollection.find().fetch();
    },
    reservationsList() {
      console.log("Reservations", reservationsCollection.find().fetch());

      let events = [];

      const listReservation = reservationsCollection.find().fetch();
      for (let i = 0; i < listReservation.length; i++) {

        console.log(this.getDateFromUnixTs(listReservation[i].tsFrom * 1000))

        events.push({
          name: listReservation[i].title,
          start: this.getDateFromUnixTs(listReservation[i].tsFrom * 1000),
          end: this.getDateFromUnixTs(listReservation[i].tsTo * 1000),
          color: "blue",
        });
      }

      this.events = events;
      console.log("Events", events)
      return reservationsCollection.find().fetch();
    },
    thingsList() {
      console.log("Things", thingsCollection.find().fetch());
      return thingsCollection.find().fetch();
    },
  },
};
</script>

<style scoped>
</style>