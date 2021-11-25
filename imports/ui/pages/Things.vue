<template>

  <v-container>
    <!-- button -->
    <v-row>
      <v-col>
        <v-btn
            large
            rounded
            class="green darken-1 white--text"
            @click="showInsertDialog()">
          <v-icon left>mdi-plus</v-icon>
          Insert Thing
        </v-btn>
      </v-col>
    </v-row>

    <!-- search bar -->
    <v-row>
      <v-col></v-col>
      <v-col>
        <v-text-field
            class="search-padding"
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- data-table -->
    <v-row>
      <v-col>
        <v-data-table
            class="margin-left margin-right"
            :headers="headers"
            :items="reservable"
            :search="search"
        >
          <template v-slot:item.action="{ item }">
            <!-- Deux boutton pour supression et modification -->
            <v-btn icon color="red" @click="bouttonAction(item)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn icon color="dark" @click="bouttonActionUpdate(item)">
              <v-icon>mdi-lead-pencil</v-icon>
            </v-btn>
          </template>
          >
        </v-data-table
        >
      </v-col>
    </v-row>

    <!-- dialogs -->
    <!-- insert dialog -->
    <v-dialog v-model="insertDialog" width="600px">
      <v-card>
        <v-form ref="insertForm" v-model="valid" lazy-validation>
          <v-card-title>
            <span class="text-h5">Insert new Thing</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                      v-model="form.name"
                      :rules="rules.name"
                      label="Name"
                      required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                      v-model="form.description"
                      :rules="rules.description"
                      label="Descriptions"
                      required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                      v-model="form.serialNumber"
                      :rules="rules.serialNumber"
                      label="SerialNumber"
                      required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                      v-model="form.categoryId"
                      :rules="rules.categoryId"
                      label="CategoryId"
                      required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                class="red darken-1 white--text"
                large
                rounded
                @click="hideInsertDialog()"
            >
              <v-icon left>mdi-cancel</v-icon>
              Cancel
            </v-btn>
            <v-btn
                class="green darken-1 white--text"
                large
                rounded
                @click="insertThings()"
            >
              <v-icon left>mdi-check</v-icon>
              Insert
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <!-- error dialog-->
    <v-dialog v-model="showMessageError" max-width="600px">
      <v-card>
        <v-card-text>Error</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" class="mr-4" @click="hideDialogError()">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- dialog selected item to delete -->
    <v-dialog v-model="showMessageDelete" max-width="600px">
      <v-card>
        <v-card-text
        >Are you sure to delete
          {{
            selectedThingToDelete && selectedThingToDelete.name
          }}?
        </v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" class="mr-4" @click="deleteThings()">
            Yes
          </v-btn>
          <v-btn color="error" class="mr-4" @click="hideDeleteDialog()">
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- dialog to update -->
    <v-dialog v-model="showMessageUpdate" max-width="600px">
      <v-card>
        <v-card-text
        >Are you sure to modify
          {{
            selectedThingToUpdate && selectedThingToUpdate.name
          }}?
        </v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" class="mr-4" @click="updateThings()">
            Yes
          </v-btn>
          <v-btn color="error" class="mr-4" @click="hideUpdateDialog()">
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import ThingsService from "../services/thingsService.js";

export default {
  name: "Things",

  data() {
    return {
      dialog: false,
      insertDialog: false,
      showMessageError: false,
      showMessageDelete: false,
      showMessageUpdate: false,
      selectedThingToDelete: null,
      selectedThingToUpdate: null,
      search: "",
      form: {
        name: null,
        description: null,
        serialNumber: null,
        categoryId: null,
      },
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        {text: "Serial Number", value: "serialNumber"},
        {text: "Description", value: "description"},
        {text: "Reserved ", value: "reserved"},
        {text: "CategoryId", value: "categoryId"},
        {text: "Action ", value: "action"},
      ],
      // Les reservables
      reservable: [
        {
          name: "Davide",
          serialnumber: "1213",
          description: " asdbhasda",
          reserved: "no",
          categoryid: "234",
        },
        {
          name: "",
          serialnumber: "",
          description: "",
          reserved: "",
          categoryid: "",
        }
      ],
      // Les obligations pour ajouter un réservable
      valid: true,
      name: "",
      rules: {
        name: [(v) => !!v || "Name is required"],
        description: [(v) => !!v || "Description is required"],
        serialNumber: [(v) => !!v || "Serial Number is required"],
        categoryId: [(v) => !!v || "CategoryId is required"],
      }
    };
  },

  methods: {
    /*
    INSERT SECTION
     */

    showInsertDialog() {
      this.insertDialog = true;
    },

    hideInsertDialog() {
      this.insertDialog = false;
      this.form = {
        name: null,
        description: null,
        serialNumber: null,
        categoryId: null,
      }
      this.$refs.insertForm.reset()
    },

    async insertThings() {
      try {
        console.log("[Component][insertThing] Inserting thing");
        const isValid = this.$refs.insertForm.validate();
        if (!isValid) return
        await ThingsService.insertThings(this.form.name, this.form.description, this.form.serialNumber, this.form.categoryId);
        this.hideInsertDialog()
      } catch (e) {
        console.error("[Component][Things][insertThings] An error occurred when insert thing", e);
        this.showDialogError();
      }
    },

    /*
    DELETE SECTION
     */

    // Dialog pour suppression
    showDeleteDialog() {
      this.showMessageDelete = true;
    },

    hideDeleteDialog() {
      this.showMessageDelete = false;
    },


    // Dialog pour modifications
    showUpdateDialog() {
      this.showMessageUpdate = true;
    },

    hideUpdateDialog() {
      this.showMessageUpdate = false;
    },

    // Reset les champs pendant l'ajout d'un réservable
    reset() {
      this.$refs.form.reset();
    },

    // Dialog pour les ereurs services
    showDialogError() {
      this.showMessageError = true;
    },
    // Dialog pour les ereurs services
    hideDialogError() {
      this.showMessageError = false;
    },

    async deleteThings() {
      try {
        if (this.selectedThingToDelete) {
          await ThingsService.deleteThings(this.selectedThingToDelete.id);
        }
      } catch (e) {
        console.error(
            "[Component][Things][deleteThings] An error occurred when insert thing",
            e
        );
        this.showDialogError();
      }
    },
    async updateThings() {
      try {
        if (this.selectedThingToUpdate) {
          await ThingsService.updateThings(this.selectedThingToUpdate.id);
          console.log(this.form);
        }
      } catch (e) {
        console.error(
            "[Component][Things][updateThings] An error occurred when insert thing",
            e
        );
        this.showDialogError();
      }
    },

    //Console log pour les items
    bouttonAction(item) {
      console.log(item);
      this.selectedThingToDelete = item;
      this.showDeleteDialog();
    },
    bouttonActionUpdate(item) {
      console.log(item);
      this.selectedThingToUpdate = item;
      this.showUpdateDialog();
    },
  },
};
</script>

<style scoped>
.margin-left {
  margin-left: 100px;
}

.margin-right {
  margin-right: 100px;
}

.search-padding {
  margin-right: 100px;
}

.btn-add {
  margin-top: 100px;
  margin-left: 100px;
}
</style>