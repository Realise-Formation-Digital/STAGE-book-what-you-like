<template><v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
          flat
        >
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Today
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
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
  meteor: {
    $subscribe: {
      'categoriesList': [],
      'reservationsList': [],
      'thingsList': []
    },
    categoriesList() {
      console.log("Categories", categoriesCollection.find().fetch())
      return categoriesCollection.find().fetch()
    },
    reservationsList() {
      console.log("Reservations", reservationsCollection.find().fetch())
      return reservationsCollection.find().fetch()
    },
    thingsList() {
      console.log("Things", thingsCollection.find().fetch())
      return thingsCollection.find().fetch()
    }
  },
}
</script>

<style scoped>

</style>