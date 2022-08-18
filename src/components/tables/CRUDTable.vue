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
          <template  v-slot:activator="{ on, attrs }">
            <v-btn
                v-if="$props.postDispatch"
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
              :show="$props.showTableInTable"
              :show-child-table="showChildTableInTable"
              :title="formTitle"
              :edit-block="$props.showToEdit"
              :edited-item="editedItem"
              :dataTable="tableData"
              :id-for-table="idForLevelTable"
              :param-in-data="$props.paramInData"
              :param-in-child-data="paramInChildData"
              @save="save($event)"
          />
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Вы уверены что хотите удалить?</v-card-title>
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
    <template v-slot:item.detail="{item}">
      <v-btn
      color="primary"
      small
      outlined
      rounded
      @click="$router.push('/candidateDetail/' + item.id)"
      >
        Подробнее
      </v-btn>
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
          v-if="$props.deleteDispatch"
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
    showTableInTable: Boolean,
    showChildTableInTable: Boolean,
    nameObject: String,
    paramInData: Object,
    paramInChildData: Object,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    data: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
    tableData: [],
    idForLevelTable: 0,
    id: '',
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
  created () {
    this.initialize()
  },
  mounted() {
    this.editedItems = this.$props.editedItems
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Добавить' : 'Изменить'
    },
  },
  methods: {
    initialize() {
      this.$store.dispatch(this.$props.getDispatch).then(r => this.data =  r)
    },
    editItem (item) {
      this.idForLevelTable = item.id
      this.tableData = item[this.$props.nameObject]
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
            .then(r => {
              r[this.$props.nameObject] = []
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
