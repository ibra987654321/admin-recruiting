<template>
  <tableInTable
      :show-child="false"
      :data-table="data"
      :param-in-table="head"
      :filters="filters"
      :video-param="params"
  />
</template>

<script>
import tableInTable from "@/components/tables/TableInTable";

export default {
  name: "TestResult",
  components: {
    tableInTable
  },
  data:() => ({
    head: {
      title: 'Результаты тестов',
      headers: [
        { text: 'Вопрос', value: 'question' },
        { text: 'Ответ', value: 'answer' },
        { text: 'Корректность', value: 'correct' },
      ],
      editedItem: {
        id: '',
        comment: '',
      },
      showToEdit: [
        { value: 'comment', label: 'Комментарии', type: 'textarea', col: '12' },
      ],
      actions: {
        postDispatch: 'postVideoComment'
      }
    },
    params: {
      delete: false
    },
    filters: {
      date: 'datetime',
      checkbox: ['correct']
    }
  }),
  computed: {
    data() {
      return this.$store.state.candidate.testResultData
    }
  }
}
</script>

<style scoped>

</style>
