<template>
  <v-container>
    <v-app>
      <v-main>
        <v-btn @click="showInsertDialog()">save</v-btn>

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
            <v-icon small @click="selectItemToDeleteAndOpenDialog(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete the name
              {{ itemToDelete && itemToDelete.name }}?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="closeDialogAndCleanVariables()"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteSelectedItem()"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="insertDialog" max-width="600px">
          <v-card>
            <v-card-title class="text-h5"> add something </v-card-title>

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
                      v-model="form.desciption"
                      label="Desciption*"
                      type="desciption"
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
                color="green darken-1"
                text
                @click="insertCleanCategory()"
              >
                Cancel
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="insertSaveCategory()"
              >
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
import CategoryService from "../services/categoryService.js";
export default {
  data() {
    return {
      search: "",
     insertDialog : false,
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
        { text: "description", value: "description" },
        { text: "Actions", value: "actions", sortable: false },
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
    customError() {
      this.nameErrorCount = 3;
      this.nameErrorDescription = ["this field has error"];
    },
    async deleteItemConfirm(item) {
      alert(JSON.stringify(item));
      console.log(item);
    },
    showInsertDialog() {
      this.insertDialog = true;
    },
    /*
    INSERT SECTION
    */
    hideInsertDialog() {
      this.insertDialog = false;
      this.form = {
        name: null,
        description: null,
      };
    },

    
   
    insertCleanCategory() {
      this.insertDialog = false;
      this.form = {
        name: null,
        description: null,
      };
      
    },
    insertSaveCategory() {
      this.insertDialog = false;
      this.form = {
        name: null,
        description: null,
      };
    },

    async insertCategory() {
      try {
        console.log("Test", this.form);
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
<style >
</style>