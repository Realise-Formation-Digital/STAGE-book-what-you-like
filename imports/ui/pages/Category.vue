<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn
            large
            rounded
            color="green darken-1 white--text"
            @click="showInsertDialog()">
          <v-icon left>mdi-plus</v-icon>
          Add Category
        </v-btn>

      </v-col>
    </v-row>
    <v-row>
      <v-col></v-col>
      <v-col>
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
            :items="categoriesList"
            :search="search"
            :items-per-page="5"
            class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn icon color="orange">
              <v-icon
                  icon
                  color="orange"
                  @click="selectItemToUpdateAndOpenDialog(item)">
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
        </v-data-table>
      </v-col>
    </v-row>

    <!-- delete dialog -->
    <v-dialog v-model="dialogDelete" max-width="600px">
      <v-card>
        <v-card-title class="text-h5"
        >Are you sure you want to delete the name<br>
          {{ itemToDelete && itemToDelete.name }}?
        </v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              large
              rounded
              class="red darken-1 white--text"
              @click="closeDialogAndCleanVariables()"
          >Cancel
          </v-btn
          >
          <v-btn
              rounded
              large
              class="green darken-1 white--text"
              @click="deleteSelectedItem()">
            OK
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- insert dialog -->
    <v-dialog v-model="insertDialog" max-width="600px">
      <v-card>
        <v-card-title class="text-h5">Insert Category</v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    v-model="form.name"
                    label="Name*"
                    :rules="[rules.required]"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    v-model="form.description"
                    label="Desciption*"
                    required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="green darken-1"
              text
              @click="hideInsertDialog()"
          >
            Cancel
          </v-btn>
          <v-btn
              color="green darken-1"
              text
              @click="insertCategory()"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- update dialog -->
    <v-dialog v-model="updateDialog" max-width="600px">
      <v-card>
        <v-card-title class="text-h5"> Update Category</v-card-title>
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
                    required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              large
              rounded
              class="red darken-1 white--text"
              text
              @click="hideUpdateDialog()"
          >
            Cancel
          </v-btn>
          <v-btn
              large
              rounded
              class="green darken-1 white--text"
              text
              @click="updateCategory()"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import CategoryService from "../services/categoryService.js";
import i18nMixin from "../mixins/i18n";
import dateMixin from "../mixins/date";
import categoriesCollection from "../collections/categoriesCollection";

export default {
  mixins: [i18nMixin, dateMixin],
  data() {
    return {
      search: "",
      insertDialog: false,
      dialogDelete: false,
      updateDialog: false,
      actions: false,
      form: {
        name: null,
        description: null,
      },
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value && value.length <= 5 || "Max 5 characters",
      },
      headers: [
        {
          text: "name",
          align: "start",
          sortable: false,
          value: "name",
        },
        {text: "description", value: "description"},
        {text: "ts", value: "ts"},
        {text: "Actions", value: "actions", sortable: false},
      ],
      itemToDelete: null,
    };
  },
  meteor: {
    $subscribe: {
      'categoriesList': []
    },
    categoriesList() {
      console.log("Categories", categoriesCollection.find().fetch())
      return categoriesCollection.find().fetch()
    }
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

    async insertCategory() {
      try {
        this.getTranslation()
        const ts = this.getUnixTs()
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
        await CategoryService.deleteCategory(this.itemToDelete._id);
        this.closeDialogAndCleanVariables();
      } catch (e) {
        console.error(
            "[Component][Category][deleteSelectedItem] An error occurred when inert Category",
            e
        );
      }
    },

    /*
    UPDATE SECTION
     */

    selectItemToUpdateAndOpenDialog(item) {
      this.form = item
      this.showUpdateDialog()
    },

    showUpdateDialog() {
      this.updateDialog = true
    },

    hideUpdateDialog() {
      this.updateDialog = false
      this.form = {
        name: null,
        description: null,
      }
    },

    async updateCategory() {
      try {
        console.log('[Component][updateCategory] Updating category')
        let result = null
        result = await CategoryService.updateCategory()
      } catch (e) {
        console.error('[Component][updateCategory] An error occurred when updating a category', e)
      }
    }

  },

};
</script>
<style>
</style>
