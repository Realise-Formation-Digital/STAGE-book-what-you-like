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
          Insert User
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
                      v-model="form.firstname"
                      :rules="rules.firstname"
                      label="FirstName"
                      required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                      v-model="form.lastname"
                      :rules="rules.lastname"
                      label="LastName"
                      required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                      v-model="form.email"
                      :rules="rules.email"
                      label="E-mail"
                      required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                      v-model="form.role"
                      :rules="rules.role"
                      label="Role"
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
                @click="insertUser()"
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
            selectedUserToDelete && selectedUserToDelete.name
          }}?
        </v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" class="mr-4" @click="deleteUser()">
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
            selectedUserToUpdate && selecteduserToUpdate.name
          }}?
        </v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" class="mr-4" @click="updateUser()">
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
import UserService from "../services/userService.js";
export default {
  name: "User",

  data() {
    return {
      dialog: false,
      insertDialog: false,
      showMessageError: false,
      showMessageDelete: false,
      showmessageUpdate: false,
      selectedUserToDelete: null,
      selectedUserToUpdate: null,
      search: "",
      form: {
        firstname: null,
        lastname: null,
        email: null,
        role: null,
      },
      headers: [
        {
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "FirstName", value: "firstname" },
        { text: "LastName", value: "lastname" },
        { text: "E-mail ", value: "email" },
        { text: "Role", value: "role" },
        { text: "Action ", value: "action" },
      ],
      // Les reservables
      reservable: [
        {
          firstname: "Marco",
          lastname: "Tribuzio",
          email: "marco.tribuzio@réalise.ch",
          role: "",
        },
        {
          firstname: "",
          lastname: "",
          email: "",
          role: "",
        },
      ],
       // Les obligations pour ajouter un réservable
      valid: true,
      name: "",
      rules: {
        firstname: [(v) => !!v || "FirstName is required"],
        lastname: [(v) => !!v || "LastName is required"],
        email: [(v) => !!v || "E-mail is required"],
        role: [(v) => !!v || "Role is required"],
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
        firstname: null,
        lastname: null,
        email: null,
        role: null,
      }
      this.$refs.insertForm.reset()
    },

    async insertUser() {
      try {
        console.log("[Component][insertUser] Inserting thing");
        const isValid = this.$refs.insertForm.validate();
        if (!isValid) return
        await UserService.insertUser(this.form.firstname, this.form.lastname, this.form.email, this.form.role);
        this.hideInsertDialog()
      } catch (e) {
        console.error("[Component][User][insertUser] An error occurred when insert user", e);
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

    async deleteUser() {
      try {
        if (this.selectedUserToDelete) {
          await ThingsService.deleteUser(this.selectedUserToDelete.id);
        }
      } catch (e) {
        console.error(
            "[Component][User][deleteUser] An error occurred when insert user",
            e
        );
        this.showDialogError();
      }
    },
    async updateUser() {
      try {
        if (this.selectedUserToUpdate) {
          await UserService.updateUser(this.selectedUserToUpdate.id);
          console.log(this.form);
        }
      } catch (e) {
        console.error(
            "[Component][User][updateUser] An error occurred when insert user",
            e
        );
        this.showDialogError();
      }
    },

    //Console log pour les items
    bouttonAction(item) {
      console.log(item);
      this.selectedUserToDelete = item;
      this.showDeleteDialog();
    },
    bouttonActionUpdate(item) {
      console.log(item);
      this.selectedUserToUpdate = item;
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