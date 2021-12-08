<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
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
          type="category"
          category-show-all
          :categories="categories"
          :events="events"
          :event-color="getEventColor"
          @change="fetchEvents"
        ></v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>


<script>
import categoriesCollection from "../collections/categoriesCollection";
import reservationsCollection from "../collections/reservationsCollection";
import thingsCollection from "../collections/thingsCollection";
export default {
  name: "Calendar",
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
    names: ["Ordinateur"],
    categories: ["John Smith"],
  }),
  mounted() {},
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
    fetchEvents({ start, end }) {
      const events = [];
      const now = new Date().getTime();

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);
      }

      console.log("ciao", new Date(1638886146000))

      events.push({
        name: "macro",
        start: new Date(1638886146000),
        end: new Date(1638896946000),
        color: this.colors[this.rnd(0, this.colors.length - 1)],
        timed: !false, 
        category: this.categories[this.rnd(0, this.categories.length - 1)],
      
      });
  

     
     
      
      this.events = events;
      
    },

    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
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
     let event = []
      const listRerservation = reservationsCollection.find().fetch()
      for (let i = 0; i < listRerservation.length; i++) {
       events.push({
        name: "macro",
        start: new Date(listRerservation)[1](tsfrom),
        end: new Date(1638896946000),
        color: this.colors[this.rnd(0, this.colors.length - 1)],
        timed: !false,
        category: this.categories[this.rnd(0, this.categories.length - 1)],
      
      });
      }
         
      this.events = events;
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