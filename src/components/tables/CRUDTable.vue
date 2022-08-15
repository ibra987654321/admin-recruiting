<template>
  <v-data-table
      :headers="$props.headers"
      :items="data"
      sort-by="calories"
      class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>{{$props.title}}</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
            v-model="dialog"
            max-width="800px"
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
          <useDialogContent
              title="Изменить"
              :edit-block="$props.showToEdit"
              :edited-item="editedItem"
              :dataTable="tableData"
              @save="save($event)"
          />
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Отммена</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Ок</v-btn>
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
    title: String,
    headers: Array,
    showToEdit: Array,
    editedItems: Object,
    getDispatch: String,
    putDispatch: String,
    deleteDispatch: String,
    postDispatch: String,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    data: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
    tableData: [],
  }),
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
    '$store.state.candidateType_id'() {
      this.initialize()
    }
  },
  inject: ['tableInData'],
  created () {
    this.initialize()
  },
  mounted() {
    this.editedItems = this.$props.editedItems
  },
  methods: {
    initialize() {
      this.$store.dispatch(this.$props.getDispatch).then(r => this.data =  r)
    },
    editItem (item) {
      this.tableData = item[this.tableInData.nameObject]
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
      this.$store.dispatch(this.$props.deleteDispatch, this.data.splice(this.editedIndex, 1)[0].id)
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
        this.$store.dispatch(this.$props.putDispatch, Object.assign(this.data[this.editedIndex], this.editedItem))
      } else {
        this.$store.dispatch(this.$props.postDispatch, this.editedItem)
        this.data.push(this.editedItem)
      }
      this.close()
    },
  }
}
</script>

<style scoped>

</style>
