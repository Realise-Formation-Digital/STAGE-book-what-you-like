<template>

  <v-container>
    <!-- button insert -->
    <v-row>
      <v-col>
        <v-btn
            large
            rounded
            color="green darken-1 white--text"
            @click="onclickAdd()">
          <v-icon left>mdi-plus</v-icon>
          Insert Thing
        </v-btn>
      </v-col>
    </v-row>

    <!-- search -->
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

    <!-- table -->
    <v-row>
      <v-col>
        <v-data-table
            class="margin-left margin-right"
            :headers="headers"
            :items="reservable"
            :search="search"
        ></v-data-table>
      </v-col>
    </v-row>

    <!-- modal -->
    <v-dialog v-model="showAdd" max-width="600px">
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation handleSubmit>
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
  </v-container>
</template>

<script>
export default {
  name: "Things",

  data() {
    return {
      dialog: false,
      showAdd: false,
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
        { text: "CategoryId", value: "categoryId" },
      ],
      // Les reservables
      reservable: [
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

  //todo it miss the service and the action button to delete a single thing

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
    async handleSubmit() {
      alert(JSON.stringify(this.form));
      console.log(this.form);
    },
  },
};
</script>

<style>
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