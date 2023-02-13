<template>
  <div>
    <CRUDTable
        title="Группы"
        :filters="filters"
        :headers="group.headers"
        :show-to-edit="group.showToEdit"
        :edited-items="group.editedItem"
        :get-dispatch="'getGroup'"
        :post-dispatch="'postGroup'"
        :put-dispatch="'putGroup'"
        :delete-dispatch="'deleteGroup'"
    />
  </div>
</template>

<script>
import CRUDTable from "@/components/tables/CRUDTable";
export default {
  name: "GroupController",
  components: {
    CRUDTable,
  },
  data:() => ({
    filters: {
      checkbox: ['toEducate']
    },
    group: {
      headers: [
        { text: 'Наименование', value: 'name' },
        { text: 'Подразделения', value: 'department.name' },
        { text: 'Обучение', value: 'toEducate' },
        { text: 'Действия ', value: 'actions' },
      ],
      editedItem: {
        "name": "",
        "toEducate": false,
        departmentId: 0
      },
      showToEdit: [
        { value: 'name', label: 'Наименование', type: 'input', col: '12' },
        { value: 'toEducate', label: 'Обучение', type: 'checkbox', col: '6' },
      ],
    },
    selectData: []
  }),
  mounted() {
    this.$store.dispatch('getDepartment').then(r => {
      const data =  {
        value: 'department',
        label: 'Подразделение',
        type: 'select-add',
        params:{ text: 'name', value: 'id'},
        data: r,
        edit: 'Добавить',
        col: '6'
      }
      this.group.showToEdit.push(data)
    })
  },
}
</script>

<style scoped>

</style>
