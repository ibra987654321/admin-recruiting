<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">{{$props.title}}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col
            v-for="(item, idx) in $props.editBlock"
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
            <v-text-field
                v-if="item.type === 'input-number'"
                v-model="editedItem[item.value]"
                :label="item.label"
                type="number"
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
              :item-text="item.params.text"
              :item-value="item.params.value"
              outlined
              dense
              :items="item.data"
            ></v-select>
            <v-select
                v-if="item.type === 'select-add' && $props.title === item.edit"
                v-model="editedItem[item.value]"
                :label="item.label"
                :item-text="item.params.text"
                :item-value="item.params.value"
                outlined
                dense
                :items="item.data"
            ></v-select>
            <v-textarea
                v-if="item.type === 'textarea'"
                outlined
                v-model="editedItem[item.value]"
                :label="item.label"
            ></v-textarea>
            <v-textarea
                v-if="item.type === 'textarea-rules'"
                outlined
                v-model="editedItem[item.value]"
                :label="item.label"
                :rules="[v => v.length <= item.rules || `Максимум ${item.rules} символов`]"
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
          <v-col cols="12" v-if="$props.show">
            <table-in-table
                :title="formTitle"
                v-if="$props.title === 'Изменить'"
                :id="$props.title === 'Изменить' ? $props.idForTable : ''"
                :data-table="data"
                :param-in-table="$props.paramInData"
                :param-in-child-data="paramInChildData"
                :show-child="showChildTable"
            ></table-in-table>
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
</template>

<script>
import tableInTable from "@/components/tables/TableInTable";
export default {
  name: 'useDialogContent',
  components: {
    tableInTable
  },
  props: {
    show: Boolean,
    showChildTable: Boolean,
    title: String,
    editedItem: Object,
    editBlock: Array,
    dataTable: Array,
    paramInData: Object,
    paramInChildData: Object,
    idForTable: Number,
  },
  data: () => ({
    date: {
      menu: false,
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
      menu5: false,
    },
  }),
  computed: {
    data() {
      return this.$props.dataTable
    },
    formTitle () {
      return this.editedIndex === -1 ? 'Добавить' : 'Изменить'
    },
  },
  methods: {
    save() {
      this.$emit('save', this.$props.editedItem)
    },
    close() {
      this.$emit('close')
    },
  }
}
</script>

<style scoped>

</style>
