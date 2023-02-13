<template>
  <div>
    <CRUDTable
        title="Хулиганы"
        :headers="dataForHooligan.headers"
        :show-table-in-table="false"
        :show-to-edit="dataForHooligan.showToEdit"
        :edited-items="dataForHooligan.editedItem"
        get-dispatch="getHooligan"
        post-dispatch="postHooligan"
        put-dispatch="putHooligan"
        delete-dispatch="deleteHooligan"
    />
  </div>
</template>

<script>
import CRUDTable from "@/components/tables/CRUDTable";
export default {
  name: "hooliganController",
  components: {
    CRUDTable
  },
  data:() => ({
    dataForHooligan: {
      headers: [
        { text: 'Имя', value: 'name' },
        { text: 'Фамилия', value: 'surname' },
        { text: 'Дата рождение', value: 'birthday' },
        { text: 'Причина', value: 'reason' },
        { text: 'Действия ', value: 'actions' },
      ],
      editedItem: {
        id: '',
        name: '',
        surname: '',
      },
      showToEdit: [
        { value: 'name', label: 'Имя', type: 'input', col: '6' },
        { value: 'surname', label: 'Фамилия', type: 'input', col: '6' },
        { value: 'birthday', label: 'Дата рождение', type: 'date', col: '6' },
        { value: 'reason', label: 'Причина', type: 'textarea', col: '12' },
      ],
    }
  })
}
</script>

<style scoped>

</style>
