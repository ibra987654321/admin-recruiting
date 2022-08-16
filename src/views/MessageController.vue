<template>
  <div>
    <CRUDTable
        title="Вопросы для видео"
        :headers="messageData.headers"
        :show-table-in-table="false"
        :show-to-edit="messageData.showToEdit"
        :edited-items="messageData.editedItem"
        get-dispatch="getMessages"
        put-dispatch="putMessage"
    />
  </div>
</template>

<script>
import CRUDTable from "@/components/tables/CRUDTable";
export default {
  name: "MessageController",
  components: {
    CRUDTable
  },
  data:() => ({
    messageData: {
      headers: [
        { text: '№', value: 'id' },
        { text: 'Текст вопроса', value: 'text' },
        { text: 'Действия ', value: 'actions' },
      ],
      editedItem: {
        id: '',
        text: '',
      },
      showToEdit: [
        { value: 'text', label: 'Текст', type: 'textarea', col: '12' },
      ],
    }
  })
}
</script>

<style scoped>

</style>
