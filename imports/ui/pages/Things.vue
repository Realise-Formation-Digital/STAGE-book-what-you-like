<template>
  <div align="left" justify="space-around">
    <!-- Boutton qui affiche le dialogue ajouter -->
    <v-btn x-large depressed class="btn-add" @click="onclickAdd()"> Add </v-btn>

    <v-card flat>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          class="search-padding"
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
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
        ></v-data-table
      >
    </v-card>

    <v-row justify="center">
      <v-dialog v-model="showAdd" max-width="600px">
        <v-card>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card-title>
              <span class="text-h5">Add</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="form.name"
                      :rules="nameRules"
                      label="Name"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="form.descriptions"
                      :rules="descriptionsRules"
                      label="Descriptions"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="form.serialnumber"
                      :rules="serialnumberRules"
                      label="SerialNumber"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="form.categoryid"
                      :rules="categoryidRules"
                      label="CategoryId"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6"> </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
              >
                Validate
              </v-btn>
              <v-btn color="error" class="mr-4" @click="reset">
                Reset Form
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
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

      <!-- Dialogue pour confirmation de supression -->
      <v-dialog v-model="showMessageDelete" max-width="600px">
        <v-card>
          <v-card-text
            >Are you sure to delete
            {{
              selectedThingToDelete && selectedThingToDelete.name
            }}?</v-card-text
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
      <!-- Dialogue pour confirmation de modification -->
      <v-dialog v-model="showmessageUpdate" max-width="600px">
        <v-card>
          <v-card-text
            >Are you sure to modify
            {{
              selectedThingToUpdate && selectedThingToUpdate.name
            }}?</v-card-text
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
    </v-row>
  </div>
</template>

<script>
import ThingsService from "../services/thingsService.js";
export default {
  name: "Things",

  data() {
    return {
      dialog: false,
      showAdd: false,
      showMessageError: false,
      showMessageDelete: false,
      showmessageUpdate: false,
      selectedThingToDelete: null,
      selectedThingToUpdate: null,
      search: "",
      form: {
        name: null,
        descriptions: null,
        serialnumber: null,
        categoryid: null,
      },
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Serial Number", value: "serial number" },
        { text: "Descriptions", value: "string" },
        { text: "Reserved ", value: "reserved" },
        { text: "CategoryId", value: "categoryid" },
        { text: "Action ", value: "action" },
      ],
      // Les reservables
      reservable: [
        {
          name: "Davide",
          serialnumber: "1213",
          descriptions: " asdbhasda",
          reserved: "no",
          categoryid: "234",
        },
        {
          name: "",
          serialnumber: "",
          descriptions: "",
          reserved: "",
          categoryid: "",
        },
        {
          name: "",
          serialnumber: "",
          descriptions: "",
          reserved: "",
          categoryid: "",
        },
        {
          name: "",
          serialnumber: "",
          descriptions: "",
          reserved: "",
          categoryid: "",
        },
        {
          name: "",
          serialnumber: "",
          descriptions: "",
          reserved: "",
          categoryid: "",
        },
        {
          name: "",
          serialnumber: "",
          descriptions: "",
          reserved: "",
          categoryid: "",
        },
        {
          name: "",
          serialnumber: "",
          descriptions: "",
          reserved: "",
          categoryid: "",
        },
        {
          name: "",
          serialnumber: "",
          descriptions: "",
          reserved: "",
          categoryid: "",
        },
        {
          name: "",
          serialnumber: "",
          descriptions: "",
          reserved: "",
          categoryid: "",
        },
        {
          name: "",
          serialnumber: "",
          descriptions: "",
          reserved: "",
          categoryid: "",
        },
      ],
      // Les obligations pour ajouter un réservable
      valid: true,
      name: "",
      nameRules: [(v) => !!v || "Name is required"],
      descriptions: "",
      descriptionsRules: [(v) => !!v || "Descriptions is required"],
      serialnumber: "",
      serialnumberRules: [(v) => !!v || "SerialNumber is required"],
      categoryid: "",
      categoryidRules: [(v) => !!v || "CategoryId is required"],
    };
  },

  methods: {
    // Dialog pour suppression
    showDeleteDialog() {
      this.showMessageDelete = true;
    },

    hideDeleteDialog() {
      this.showMessageDelete = false;
    },
    // Dialog pour modifications
    showUpdateDialog() {
      this.showmessageUpdate = true;
    },

    hideUpdateDialog() {
      this.showmessageUpdate = false;
    },
    // Boutton qui affiche le dialog pour ajouter
    onclickAdd() {
      this.showAdd = !this.showAdd;
    },
    // Validation de l'ajout d'un réservable
    async validate() {
      try {
        this.$refs.form.validate();
        await this.insertThings();
      } catch (e) {
        console.error("[Component][validate]", e);
      }
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
    async insertThings() {
      console.log("[Component][insertThing]");
      try {
        alert(JSON.stringify(this.form));
        await ThingsService.insertThings();
        console.log(this.form);
      } catch (e) {
        console.error(
          "[Component][Things][insertThings] An error occurred when insert thing",
          e
        );
        this.showDialogError();
      }
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
  margin-right: 85px;
}
.btn-add {
  margin-top: 100px;
  margin-left: 100px;
}
</style>