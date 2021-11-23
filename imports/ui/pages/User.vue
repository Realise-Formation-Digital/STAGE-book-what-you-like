<template>
  <div align="left" justify="space-around">
    <!-- Boutton qui affiche le dialogue  -->
    <v-btn x-large depressed class="btn-add"  @click="onclickAdd()">
      Add User
    </v-btn>

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
          <v-btn icon color="red" @click="bouttonAction(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn bouttonAction icon color="dark" @click="bouttonAction(item)">
            <v-icon>mdi-lead-pencil</v-icon>
          </v-btn>
        </template>
      </v-data-table>
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
                      v-model="form.firstname"
                      :rules="firstnameRules"
                      label="FirstName"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="form.lastname"
                      :rules="lastnameRules"
                      label="LastName"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="form.email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="form.role"
                      :rules="roleRules"
                      label="Role"
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
    </v-row>
  </div>
</template>

<script>
import UserService from '../services/userService.js'
export default {
  name: "User",

  data() {
    return {
      dialog: false,
      showAdd: false,
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
        {
          firstname: "",
          lastname: "",
          email: "",
          role: "",
        },
        {
          firstname: "",
          lastname: "",
          email: "",
          role: "",
        },
        {
          firstname: "",
          lastname: "",
          email: "",
          role: "",
        },
        {
          firstname: "",
          lastname: "",
          email: "",
        },
        {
          firstname: "",
          lastname: "",
          email: "",
          role: "",
        },
        {
          firstname: "",
          lastname: "",
          email: "",
          role: "",
        },
        {
          firstname: "",
          lastname: "",
          email: "",
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
      firstname: "",
      firstnameRules: [(v) => !!v || "FirstName is required"],
      lastname: "",
      lastnameRules: [(v) => !!v || "LastName is required"],
      email: "",
      emailRules: [(v) => !!v || "E-mail is required"],
      role: "",
      roleRules: [(v) => !!v || "Role is required"],
    };
  },

  methods: {
    onclickAdd() {
      this.showAdd = !this.showAdd;
    },
    // Validation de l'ajout d'un réservable
    validate() {
      this.$refs.form.validate();
    },
    // Reset les champs pendant l'ajout d'un réservable
    reset() {
      this.$refs.form.reset();
    },
    // Console log pour le service
    showDialogError() {
      this.showMessageError = true;
    },
    hideDialogError() {
      this.showMessageError = false;
    },

    /**
     *
     */
    async insertUser() {
      try {
        alert(JSON.stringify(this.form));
        await UserService.insertUser();
        console.log(this.form);
      } catch (e) {
        console.error(
          "[Component][User][insertUser] An error occurred when insert thing",
          e
        );
        this.showDialogError();
      }
    },
    async deleteThings() {
      try {
        alert(JSON.stringify(this.form));
        await UserService.deleteUser();
        console.log(this.form);
      } catch (e) {
        console.error(
          "[Component][User][deleteUser] An error occurred when insert thing",
          e
        );
        this.showDialogError();
      }
    },
    async updateUser() {
      try {
        alert(JSON.stringify(this.form));
        await UserService.updateUser();
        console.log(this.form);
      } catch (e) {
        console.error(
          "[Component][User][updateUser] An error occurred when insert thing",
          e
        );
        this.showDialogError();
      }
    },

    //Console log pour les items
    async bouttonAction(item) {
      alert(JSON.stringify(item));
      console.log(item);
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