<template>
  <v-container>

    <!-- first Row -->
    <v-row>
      <v-col>
        <v-btn
            rounded
            large
            color="green darken-1 white--text"
            @click="showInsertDialog()">
          <v-icon left>
            mdi-plus
          </v-icon>
          New Category
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
            :items="items"
            :search="search"
            :items-per-page="5"
            class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn icon color="orange">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="red"
                   @click="selectItemToDeleteAndOpenDialog(item)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <!-- delete dialog -->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5"
        >Are you sure you want to delete the name<br>
          {{ itemToDelete && itemToDelete.name }}?
        </v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="red darken-1 white--text"
              rounded
              large
              @click="closeDialogAndCleanVariables()">
            <v-icon left>mdi-close</v-icon>
            Cancel
          </v-btn>
          <v-btn
              rounded
              large
              color="green darken-1 white--text"
              @click="deleteSelectedItem()">
            <v-icon left>mdi-check</v-icon>
            OK
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- insert dialog -->
    <v-dialog v-model="dialogInsert" max-width="600px">
      <v-card>
        <v-card-title class="text-h5">Insert a new Category</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    v-model="form.name"
                    label="Name*"
                    :rules="[rules.required, rules.counter]"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    v-model="form.description"
                    label="Description*"
                    type="Description"
                    required
                ></v-text-field>
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
              @click="cancelInsertCategory()"
          >
            <v-icon left>
              mdi-close
            </v-icon>
            Cancel
          </v-btn>
          <v-btn
              color="green darken-1 white--text"
              large
              rounded
              @click="insertCategory()"
          >
            <v-icon left>
              mdi-check
            </v-icon>
            Insert
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import CategoryService from "../services/categoryService.js";

export default {
  data() {
    return {
      search: "",
      dialogInsert: false,
      dialogDelete: false,
      actions: false,
      form: {
        name: null,
        description: null,
      },
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 5 || "Max 5 characters",
      },

      headers: [
        {
          text: "name",
          align: "start",
          sortable: false,
          value: "name",
        },
        {text: "description", value: "description"},
        {text: "Actions", value: "actions", sortable: false},
      ],
      items: [
        {
          name: "ordinateur",
          description: 262,
        },
        {
          name: "parking",
          description: 262,
        },
        {
          name: "salleo",
          description: 262,
        },
      ],
      itemToDelete: null,
    };
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
      this.dialogInsert = true;
    },

    hideInsertDialog() {
      this.dialogInsert = false;
      this.form = {
        name: null,
        description: null,
      };
    },

    cancelInsertCategory() {
      this.hideInsertDialog()
    },

    async insertCategory() {
      try {
        console.log("Insert Category", this.form);
        await CategoryService.insertCategory(
            this.form.name,
            this.form.description,
        );
        this.hideInsertDialog();
      } catch (e) {
        console.error(
            "[Component][Category][insertCategory] An error occurred when inert category",
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
        console.log("Test", this.itemToDelete);
        await CategoryService.insertCategory(this.itemToDelete.id);
        this.closeDialogAndCleanVariables();
      } catch (e) {
        console.error(
            "[Component][Category][deleteSelectedItem] An error occurred when inert Category",
            e
        );
      }
    },

  },

};
</script>
<style>
</style>