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
            :label="getTranslation('search')"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="items"
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

            <template v-slot:item.ts="{ item }">
              <v-chip>
                {{ getTs(item.ts) }}
              </v-chip>
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
              @click="insertReservation()"
            >
              <v-icon left> mdi-check</v-icon>
              Insert
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
                  <v-text-field
                    v-model="form.thinks"
                    :label="getTranslation('thinks')"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.user"
                    :label="getTranslation('user')"
                    type="user"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.category"
                    :label="getTranslation('category')"
                    type="category"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-menu
                    ref="menufrom"
                    v-model="menufrom"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="datefrom"
                        label="from"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="datefrom"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12">
                  <v-menu
                    ref="menuto"
                    v-model="menuto"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dateto"
                        label="to"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="dateto"></v-date-picker>
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
              <v-icon left> mdi-close</v-icon>
              Cancel
            </v-btn>
            <v-btn
              color="green darken-1 white--text"
              large
              rounded
              @click="insertReservation()"
            >
              <v-icon left> mdi-check</v-icon>
              Insert
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- update dialog -->
      <v-dialog v-model="updateDialog" max-width="600px">
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
                <v-col cols="12">
                  <v-text-field
                    v-model="form.user"
                    label="user*"
                    type="user"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.category"
                    label="category*"
                    type="category"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.from"
                        label="from"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form"
                      :active-picker.sync="activePicker"
                      :max="
                        new Date(
                          Date.now() - new Date().getTimezoneOffset() * 60000
                        )
                          .toISOString()
                          .substr(0, 10)
                      "
                      min="1950-01-01"
                      @change="save"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-menu
                  ref="menu"
                  v-model="form"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.to"
                      label="to"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form"
                    :active-picker.sync="activePicker"
                    :max="
                      new Date(
                        Date.now() - new Date().getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .substr(0, 10)
                    "
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1 white--text"
              large
              rounded
              @click="cancelUpdateReservation()"
            >
              <v-icon left>mdi-close</v-icon>
              Cancel
            </v-btn>
            <v-btn
              color="green darken-1 white--text"
              large
              rounded
              @click="updateReservation()"
            >
              <v-icon left> mdi-check</v-icon>
              Update
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-container>
</template>
<script>

import ReservationService from "../services/reservationService.js";
import i18nMixin from "../mixins/i18n";
import dateMixin from "../mixins/date";

import dayjs from "dayjs";
export default {
  mixins: [i18nMixin, dateMixin],
  name: "Reservation",
  data: () => {
    return {
      search: "",
      insertDialog: false,
      dialogDelete: false,
      updateDialog: false,
      actions: false,
      activePicker: null,
      date: null,
      menu: false,
      activePicker: null,
      due: null,
      date: null,
      menu: false,
      form: {
        from: null,
        to: null,
        thinks: null,
        user: null,
        category: null,
      },
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 5 || "Max 5 characters",
      },

      headers: [
        {
          text: "category",
          align: "start",
          sortable: false,
          value: "category",
        },
        { text: "things", value: "things" },
        { text: "user", value: "user" },
        { text: "from", value: "from" },
        { text: "to", value: "to" },
        { text: "ts", value: "ts" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      items: [
        {
          category: "ordinateur",
          things: "id",
          user: "id",
          from: 1,
          to: 2,
        },
        {
          category: "parking",
          things: "id",
          user: "id",
          from: 1,
          to: 2,
        },
        {
          category: "salleo",
          things: "id",
          user: "id",
          from: 1,
          to: 2,
        },
      ],
      itemToDelete: null,
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },

  methods: {
    async deleteItemConfirm(item) {
      alert(JSON.stringify(item));
      console.log(item);
    },
    computed:{
      formatteDate(){
       return this.due
      }
    },
    testDatePicker() {
      console.log("test");
    },
    save(date) {
      this.$refs.menu.save(date);
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
        from: null,
        to: null,
        thinks: null,
        user: null,
        category: null,
      };
    },
    hideInsertDialog() {
      this.insertDialog = false;
      this.data = {
        from: null,
        to: null,
       
      };
    },

    cancelInsertReservation() {
      this.hideInsertDialog();
    },

    async insertReservation() {
      try {
        console.log("Insert Reservation", this.form);

        await ReservationService.insertReservation(
          this.form.from,
          this.form.to,
          this.form.thinks,
          this.form.user,
          this.form.category
        );
        this.hideInsertDialog(true);
      } catch (e) {
        console.error(
          "[Component][Reservation][insertSaveReservation] An error occurred when inert reservation",
          e
        );
      }
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
        await ReservationService.deleteReservation(this.itemToDelete.id);
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
      this.menui = item;

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
