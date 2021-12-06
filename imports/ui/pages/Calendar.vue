<template>
  <h1>Calendar</h1>
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