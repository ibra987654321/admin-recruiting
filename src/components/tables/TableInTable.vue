<template>
  <v-data-table
      :headers="tableInData.headers"
      :items="data"
      sort-by="calories"
      class="elevation-1"
      :no-data-text="'Данных нет'"
  >
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>{{tableInData.title}}</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
            v-model="dialog"
            max-width="500px"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">{{tableInData.title}}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                      v-for="(item, idx) in tableInData.showToEdit"
                      :key="idx"
                      cols="12"
                      :md="item.col"
                  >
                    <v-text-field
                        v-if="item.type === 'input'"
                        v-model="tableInData.editedItem[item.value]"
                        :label="item.label"
                        outlined
                        dense
                    ></v-text-field>
                    <v-checkbox
                        v-if="item.type === 'checkbox'"
                        v-model="tableInData.editedItem[item.value]"
                        :label="item.label"
                    ></v-checkbox>
                    <v-select
                        v-if="item.type === 'select'"
                        v-model="tableInData.editedItem[item.value]"
                        :label="item.label"
                        outlined
                        dense
                        :items="item.data"
                    ></v-select>
                    <v-textarea
                        v-if="item.type === 'textarea'"
                        outlined
                        v-model="tableInData.editedItem[item.value]"
                        :label="item.label"
                    ></v-textarea>
                    <v-menu
                        v-if="item.type === 'date'"
                        :key="'menu' + idx"
                        v-model="date['menu' + idx]"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        class="mx-auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="tableInData.editedItem[item.value]"
                            :label="item.label"
                            outlined
                            dense
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                          v-model="tableInData.editedItem[item.value]"
                          @input="date['menu' + idx] = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
              >
                Отмена
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
              >
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
          small
          @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      Данных нет
    </template>
  </v-data-table>
</template>

<script>
import useDialogContent from "@/components/dialogs/useDialogContent";
export default {
  components: {
    useDialogContent
  },
  name: "CRUDTable",
  props: {
    dataTable: Array,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    data: [],
    editedIndex: -1,
    // editedItem: {},
    // defaultItem: {},
    date: {
      menu: false,
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
      menu5: false,
    },
  }),

  inject: ['tableInData',],

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.data = this.$props.dataTable
  },
  mounted() {
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.data.indexOf(item)
      this.tableInData.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.data.indexOf(item)
      this.tableInData.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.data.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.tableInData.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.tableInData.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.data[this.editedIndex], this.editedItem)
      } else {
        this.data.push(this.editedItem)
      }
      this.close()
    },
  }
}
</script>

<style scoped>

</style>
