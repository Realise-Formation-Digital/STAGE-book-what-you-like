<template>
  <v-container>
    <v-main>
      <!-- first Row -->
      <v-row>
        <v-col>
          <v-btn
              rounded
              large
              color="green darken-1 white--text"
              @click="showInsertDialog()"
          >
            <v-icon left>mdi-plus</v-icon>
            Reservation
          </v-btn>
        </v-col>
      </v-row>

      <!-- Second row -->
      <v-row class="text-right">
        <v-col md="6"></v-col>
        <v-col md="6">
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-data-table
              :headers="headers"
              :items="reservationsList"
              :search="search"
              :items-per-page="5"
              class="elevation-1"
          >
            <template v-slot:item.actions="{ item }">
              <v-btn icon color="orange">
                <v-icon
                    icon
                    color="orange"
                    @click="selectItemToUpdateAndOpenDialog(item)"
                >
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn
                  icon
                  color="red"
                  @click="selectItemToDeleteAndOpenDialog(item)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <template v-slot:item.thingId="{ item }">
              {{ getThingName(item.thingId) }}
            </template>
            <template v-slot:item.tsFrom="{ item }">
              {{getTs(item.tsFrom * 1000)}}
            </template>
            <template v-slot:item.tsTo="{ item }">
              {{getTs(item.tsTo * 1000)}}
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <!-- delete dialog -->
      <v-dialog v-model="dialogDelete" max-width="600px">
        <v-card>
          <v-card-title class="text-h5"
          >Are you sure you want to delete the category
            {{ itemToDelete && itemToDelete.category }}?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="red darken-1 white--text"
                large
                rounded
                @click="cancelInsertReservation()"
            >
              <v-icon left> mdi-close</v-icon>
              Cancel
            </v-btn>
            <v-btn
                color="green darken-1 white--text"
                large
                rounded
                @click="deleteSelectedItem()"
            >
              <v-icon left>mdi-check</v-icon>
              Cancel
            </v-btn>

            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- insert dialog -->
      <v-dialog v-model="insertDialog" max-width="600px">
        <v-card>
          <v-card-title class="text-h5">Insert Reservation</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-select
                      :items="thingsList"
                      v-model="form.thinks"
                      :menu-props="{ top: true, offsetY: true }"
                      label="things*"
                      item-text="name"
                      item-value="_id"
                      required
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      v-model="form.title"
                      label="title"
                      required
                  ></v-text-field>
                </v-col>
<!--                <v-col cols="12">
                  <v-text-field
                      v-model="form.user"
                      label="user*"
                      type="user"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      v-model="form.categoryId"
                      label="category*"
                      type="category"
                      required
                  ></v-text-field>
                </v-col>-->


                <v-col cols="12">
                  <v-menu
                      ref="menu"
                      v-model="menuFrom"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          v-model="form.from"
                          label="Date From"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                      ></v-text-field>
                      <!-- Time Picker From -->

<!--                      <v-col style="width: 350px; flex: 0 1 auto">
                        <h2>Start:</h2>
                        <v-time-picker
                            v-model="start"
                            :min="end"
                            :active-picker.sync="activePicker"
                            @change="save"
                        >
                        </v-time-picker>
                      </v-col>-->
                    </template>
                    <v-date-picker
                        v-model="form.from"
                        :active-picker.sync="activePicker"
                        @change="save"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col>
                  <v-menu
                      ref="menuTimeFrom"
                      v-model="menuTimeFrom"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="start"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          v-model="start"
                          label="Picker in menu"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                        v-if="menuTimeFrom"
                        v-model="start"
                        format="24hr"
                        full-width
                        @click:minute="$refs.menuTimeFrom.save(start)"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12">
                  <v-menu
                      v-model="menuTo"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          v-model="form.to"
                          label="To"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                      ></v-text-field>
                      <!-- Time Picker to -->
<!--                      <v-col style="width: 350px; flex: 0 1 auto">
                        <h2>End:</h2>
                        <v-time-picker
                            v-model="end"
                            :max="start"
                            :active-picker.sync="activePicker"
                            @change="save"
                        >
                        </v-time-picker>
                      </v-col>-->
                    </template>
                    <v-date-picker
                        v-model="form.to"
                        :active-picker.sync="activePicker"
                        @change="save"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col>
                  <v-menu
                      ref="menuTimeTo"
                      v-model="menuTimeTo"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="end"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          v-model="end"
                          label="Hours End"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                        v-if="menuTimeTo"
                        v-model="end"
                        :min="start"
                        full-width
                        format="24hr"
                        @click:minute="$refs.menuTimeTo.save(end)"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="red darken-1 white--text"
                large
                rounded
                @click="cancelInsertReservation()"
            >
              <v-icon left>mdi-close</v-icon>
              Cancel
            </v-btn>
            <v-btn
                color="green darken-1 white--text"
                large
                rounded
                @click="insertReservation()"
            >
              <v-icon left>mdi-check</v-icon>
              Insert
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- update dialog -->
<!--      <v-dialog v-model="updateDialog" max-width="600px">
        <v-card>
          <v-card-title class="text-h5">Update Reservation</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                      v-model="form.things"
                      label="things*"
                      required
                  ></v-text-field>
                </v-col>
&lt;!&ndash;                <v-col cols="12">&ndash;&gt;
&lt;!&ndash;                  <v-text-field&ndash;&gt;
&lt;!&ndash;                      v-model="form.user"&ndash;&gt;
&lt;!&ndash;                      label="user*"&ndash;&gt;
&lt;!&ndash;                      type="user"&ndash;&gt;
&lt;!&ndash;                      required&ndash;&gt;
&lt;!&ndash;                  ></v-text-field>&ndash;&gt;
&lt;!&ndash;                </v-col>&ndash;&gt;
&lt;!&ndash;                <v-col cols="12">
                  <v-text-field
                      v-model="form.category"
                      label="category*"
                      type="category"
                      required
                  ></v-text-field>
                </v-col>&ndash;&gt;
                <v-col cols="12">
                  <v-menu
                      ref="menu"
                      v-model="menuFrom"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          v-model="form.from"
                          label="From"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="form.from"
                        :active-picker.sync="activePicker"
                        @change="save"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12">
                  <v-menu
                      ref="menu"
                      v-model="menuTo"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          v-model="form.to"
                          label="To"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="form.to"
                        :active-picker.sync="activePicker"
                        @change="save"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="red darken-1 white&#45;&#45;text"
                large
                rounded
                @click="cancelUpdateReservation()"
            >
              <v-icon left>mdi-close</v-icon>
              Cancel
            </v-btn>
            <v-btn
                color="green darken-1 white&#45;&#45;text"
                large
                rounded
                @click="updateReservation()"
            >
              <v-icon left> mdi-check</v-icon>
              Update
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>-->
    </v-main>
  </v-container>
</template>
<script>
import ReservationService from "../services/reservationService.js";
import categoriesCollection from "../collections/categoriesCollection";
import reservationsCollection from "../collections/reservationsCollection";
import thingsCollection from "../collections/thingsCollection";
import dateMixin from "../mixins/date";

export default {
  name: "Reservation",
  mixins: [dateMixin],
  data: () => {
    return {
      search: "",
      start: null,
      end: null,

      insertDialog: false,
      dialogDelete: false,
      updateDialog: false,
      actions: false,
      activePicker: null,
      date: null,
      menuFrom: false,
      menuTo: false,
      menuTimeFrom: false,
      menuTimeTo: false,
      form: {
        title: null,
        from: null,
        to: null,
        thinks: null,
        user: null,
        categoryId: null
      },
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 5 || "Max 5 characters",
      },
      headers: [
       /* {
          text: "category",
          align: "start",
          sortable: false,
          value: "categoryId",
        },*/
        {text: "things", value: "thingId"},
/*
        {text: "user", value: "user"},
*/
        {text: "from", value: "tsFrom"},
        {text: "to", value: "tsTo"},
        {text: "Actions", value: "actions", sortable: false},
      ],
      itemToDelete: null,
    };
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
      return reservationsCollection.find().fetch();
    },
    thingsList() {
      console.log("Things", thingsCollection.find().fetch());
      return thingsCollection.find().fetch();
    },
  },
  methods: {
    async deleteItemConfirm(item) {
      alert(JSON.stringify(item));
      console.log(item);
    },
    /*
    INSERT SECTION
    */
    showInsertDialog() {
      this.insertDialog = true;
    },
    hideInsertDialog() {
      this.insertDialog = false;
      this.form = {
        title: null,
        from: null,
        to: null,
        thinks: null,
        user: null,
        categoryId: null,
      };
    },
    cancelInsertReservation() {
      this.hideInsertDialog();
    },

    getThingName (id) {
      const thingFound = this.thingsList.find((t) => t._id === id)
      return thingFound && thingFound.name || "Undefined"
    },

    async insertReservation() {
      try {
        console.log("Insert Reservation", this.form, this.end, this.start);

        const dateFrom = this.getUnixTsFromDate(this.form.from + " " + this.start + ":00")
        const dateTo = this.getUnixTsFromDate(this.form.to + " " + this.end + ":00")

        await ReservationService.insertReservation(
            this.form.title,
            dateFrom,
            dateTo,
            this.form.thinks,
            this.form.user,
            this.form.categoryId
        );
        this.hideInsertDialog(true);
      } catch (e) {
        console.error(
            "[Component][Reservation][insertSaveReservation] An error occurred when inert reservation",
            e
        );
      }
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    /*
    DELETE SECTION
    */
    selectItemToDeleteAndOpenDialog(itemToDelete) {
      this.itemToDelete = itemToDelete;
      this.dialogDelete = true;
    },
    closeDialogAndCleanVariables() {
      this.dialogDelete = false;
      this.itemToDelete = null;
    },
    async deleteSelectedItem() {
      try {
        await ReservationService.deleteReservation(this.itemToDelete._id);
        this.closeDialogAndCleanVariables();
      } catch (e) {
        console.error(
            "[Component][Reservation][deleteSelectedItem] An error occurred when inert reservation",
            e
        );
      }
    },
    /*
    UPDATE SECTION
     */
    showUpdateDialog() {
      this.updateDialog = true;
    },
    hideUpdateDialog() {
      this.updateDialog = false;
    },
    cancelUpdateReservation() {
      this.form = {
        from: null,
        to: null,
        thinks: null,
        user: null,
        category: null,
      };
      this.hideUpdateDialog();
    },
    selectItemToUpdateAndOpenDialog(item) {
      this.form = item;
      this.showUpdateDialog();
    },
    updateReservation() {
      try {
        console.log("[Components][updateReservation] Updating reservation");
        let result = null;
        result = ReservationService.updateReservation(this.form.id, this.form);
        this.cancelInsertReservation();
      } catch (e) {
        console.log(
            "[Component][Reservation][updateReservation] An error occurred when updating reservation",
            e
        );
        //todo something
      }
    },
  },
};
</script>
<style>
</style>