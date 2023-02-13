<template>
  <div>
    <CRUDTable
        title="Настройки для Подразделений"
        :headers="dataForDepartment.headers"
        :show-table-in-table="false"
        :show-to-edit="dataForDepartment.showToEdit"
        :edited-items="dataForDepartment.editedItem"
        get-dispatch="getDepartment"
        post-dispatch="postDepartment"
        put-dispatch="putDepartment"
        delete-dispatch="deleteDepartment"
    />
  </div>
</template>

<script>
import CRUDTable from "@/components/tables/CRUDTable";
export default {
  name: "DepartmentController",
  components: {
    CRUDTable
  },
  data:() => ({
    dataForDepartment: {
      headers: [
        { text: 'Название', value: 'name' },
        { text: 'Действия ', value: 'actions' },
      ],
      editedItem: {
        id: '',
        name: '',
      },
      showToEdit: [
        { value: 'name', label: 'Название', type: 'textarea', col: '12' },
      ],
    }
  })
}
</script>

<style scoped>

</style>
