<template>
  <CRUDTable
      title="Обратная связь"
      :headers="headers"
      :filters="filters"
      get-dispatch="getFeedback"
  />
</template>

<script>
import CRUDTable from "@/components/tables/CRUDTable";

export default {
  name: "FeedbackList",
  components: {
    CRUDTable
  },
  data:() => ({
    headers: [
      { text: 'Имя', value: 'name' },
      { text: 'Почта', value: 'email' },
      { text: 'Дата', value: 'date' },
      { text: 'Комментарий ', value: 'comment' },
    ],
    filters: {
      date: 'date'
    }
  })
}
</script>

<style scoped>

</style>
