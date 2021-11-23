<template>
  <v-container>
    <v-app>
      <v-main>
        <v-btn @click="showDialog()">save</v-btn>

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

        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete the category
              {{ itemToDelete && itemToDelete.category }}?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete()"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm()"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialog" max-width="600px">
          <v-card>
            <v-card-title class="text-h5"> add something </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="form.name"
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
                      v-model="form.from"
                      label="category*"
                      type="category"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="form.to"
                      label="from*"
                      type="from"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="form.to"
                      label="to*"
                      type="to"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6"> </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="checkForm()">
                Agree
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-main>
    </v-app>
  </v-container>
</template>
<script>
export default {
  name: "Reservation",
  data: () => {
    return {
      search: "",
      dialog: false,
      dialogDelete: false,
      actions: false,
      form: {
        from: null,
        to: null,
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
  methods: {
    async showDialog() {
      this.dialog = true;
      this.$refs.form.validate();
    },
    deleteItem(itemToDelete) {
      this.itemToDelete = itemToDelete;
      this.dialogDelete = true;
    },

    hideDialog() {
      this.dialog = false;
    },

    customError() {
      this.nameErrorCount = 3;
      this.nameErrorDescription = ["this field has error"];
    },

    async deleteItemConfirm(item) {
      alert(JSON.stringify(item));
      console.log(item);
    },
    closeDelete(item) {
      this.dialogDelete = false;
      this.itemToDelete = null;
      console.log(item);
    },
    deleteItemConfirm() {
      console.log("Test", this.itemToDelete);
      this.dialogDelete = false;
    },
    checkForm() {
      console.log("Test", this.form);
      this.hideDialog();
    },
  },
};
</script>
<style scoped>
</style>