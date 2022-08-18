<template>
  <v-data-table
      :headers="$props.paramInChildTable.headers"
      :items="data"
      sort-by="calories"
      class="elevation-1"
      :no-data-text="'Данных нет'"
  >
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>{{$props.paramInChildTable.title}}</v-toolbar-title>
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
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
            >
              Добавить
            </v-btn>
          </template>
          {{init}}
          <v-card>
            <v-card-title>
              <span class="text-h5">{{formTitle}}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                      v-for="(item, idx) in $props.paramInChildTable.showToEdit"
                      :key="idx"
                      cols="12"
                      :md="item.col"
                  >
                    <v-text-field
                        v-if="item.type === 'input'"
                        v-model="editedItem[item.value]"
                        :label="item.label"
                        outlined
                        dense
                    ></v-text-field>
                    <v-checkbox
                        v-if="item.type === 'checkbox'"
                        v-model="editedItem[item.value]"
                        :label="item.label"
                    ></v-checkbox>
                    <v-select
                        v-if="item.type === 'select'"
                        v-model="editedItem[item.value]"
                        :label="item.label"
                        outlined
                        dense
                        :items="item.data"
                    ></v-select>
                    <v-textarea
                        v-if="item.type === 'textarea'"
                        outlined
                        hide-details
                        v-model="editedItem[item.value]"
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
                            v-model="editedItem[item.value]"
                            :label="item.label"
                            outlined
                            dense
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                          v-model="editedItem[item.value]"
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
                  dark
                  color="secondary"
                  @click="close"
              >
                Отмена
              </v-btn>
              <v-btn
                  dark
                  color="success"
                  @click="save"
              >
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Вы уверены что хотите удалить?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Отмена</v-btn>
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
export default {
  components: {
  },
  name: "ChildTable",
  props: {
    ChildDataTable: Array,
    id: Number,
    paramInChildTable: Object,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    data: [],
    idForSave: '',
    editedIndex: -1,
    editedItem: {},
    date: {
      menu: false,
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
      menu5: false,
    },
  }),

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
  },
  computed: {
    init() {
      this.idForSave = this.$props.id
      this.editedItem = this.$props.paramInChildTable.editedItem
      this.data = this.$props.ChildDataTable
      return ''
    },
    formTitle () {
      return this.editedIndex === -1 ? 'Добавить' : 'Изменить'
    },
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.data.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.data.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.$store.dispatch(this.$props.paramInChildTable.actions.deleteDispatch, this.data.splice(this.editedIndex, 1)[0].id)
      this.data.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.data[this.editedIndex], this.editedItem)
        this.$store.dispatch(this.$props.paramInChildTable.actions.putDispatch, Object.assign(this.data[this.editedIndex], this.editedItem))
      } else {
        const data = {
          id:  this.idForSave,
          data: this.editedItem
        }
        this.$store.dispatch(this.$props.paramInChildTable.actions.postDispatch, data)
            .then(r => {
              this.data.push(r)
            })
      }
      this.close()
    },
  }
}
</script>

<style scoped>

</style>
